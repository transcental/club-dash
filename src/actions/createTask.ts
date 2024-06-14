"use server";
import { prisma } from "~/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function createTask(formData: FormData) {
  // Check if the user is authenticated
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to add an item to your cart");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const clubName = formData.get("club") as string;
  console.log(formData);

  // Create a new club in the database
  const club = await prisma.club.findUnique({
    where: {
      id: clubName,
    },
    include: {
      owner: true,
    },
  });

  if (!club) {
    throw new Error("Club not found");
  }

  if (club.ownerId !== userId) {
    throw new Error("You must be the owner of the club to create a task");
  }

  await prisma.club.update({
    where: {
      id: club.id,
    },
    data: {
      tasks: {
        create: {
          name,
          description,
        },
      },
    },
  });

  // Redirect the user to the dashboard
  return {
    redirect: {
      destination: `/club/${club.name}/tasks/${name}`,
      permanent: false,
    },
  };
}
