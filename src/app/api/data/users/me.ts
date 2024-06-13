"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to get your info");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      clubs: {
        include: {
          owner: true,
        },
      },
    },
  });
}
