"use server";
import { prisma } from "~/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function createClub(formData: FormData) {
  // Check if the user is authenticated
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to add an item to your cart");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Create a new club in the database
  await prisma.club.create({
    data: {
      name,
      description,
      ownerId: userId,
    },
  });

  // Redirect the user to the dashboard
  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
}
