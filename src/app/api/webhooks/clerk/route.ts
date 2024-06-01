import type { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { env } from "~/env"; // Clerk Webhook: create or delete a user in the database by Clerk ID

// Clerk Webhook: create or delete a user in the database by Clerk ID
export async function POST(req: Request) {
  try {
    // Parse the Clerk Webhook event
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(env.CLERK_SIGNING_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }
    if (
      evt.type === "user.created" ||
      evt.type === "user.deleted" ||
      evt.type === "user.updated"
    ) {
      const clerkUser = evt.data as UserJSON;
      if (!clerkUser.id)
        return NextResponse.json(
          { error: "No user ID provided" },
          { status: 400 },
        );

      // Create or delete a user in the database based on the Clerk Webhook event
      let userData = null;
      switch (evt.type) {
        case "user.created" || "user.updated": {
          const data = {
            id: clerkUser.id,
            email:
              clerkUser.email_addresses.find(
                (email) => email.id === clerkUser.primary_email_address_id,
              )?.email_address || clerkUser.email_addresses[0]?.email_address,
            forename: clerkUser?.first_name,
            surname: clerkUser?.last_name,
          };
          userData = await prisma.user.upsert({
            where: {
              id: clerkUser.id,
            },
            update: data,
            create: data,
          });
          break;
        }
        case "user.deleted": {
          userData = await prisma.user.delete({
            where: {
              id: clerkUser.id,
            },
          });
          break;
        }
        default:
          break;
      }

      return NextResponse.json({ clerkUser });
    } else {
      // Handle other event types here
      console.log(`Unsupported event type: ${evt.type}`);
      return NextResponse.json(
        { error: "Unsupported event type" },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
