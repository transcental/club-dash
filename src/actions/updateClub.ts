"use server";
import { prisma } from "~/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function updateClub(formData: FormData) {
  // Check if the user is authenticated
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to update a club");
  }
  // Fetch club, check if user is owner, update club
  const clubId = formData.get("id") as string;
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
  });
  if (!club) {
    throw new Error("Club not found");
  } else if (club.ownerId !== userId) {
    throw new Error("You must be the owner of the club to update it");
  }

  const updatedClub = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      logo: formData.get("logo") as string,
      website: formData.get("website") as string,
    },
  });

  // Redirect the user to the dashboard
  return {
    redirect: {
      destination: `/club/${updatedClub.name}`,
      permanent: false,
    },
  };
}
