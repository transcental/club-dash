import { prisma } from "~/lib/prisma";
import Sidebar from "~/components/clubs/Sidebar";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { club: string } }) {
  const parsedName = decodeURIComponent(params.club);
  const club = await prisma.club.findUnique({
    where: {
      name: parsedName,
    },
    include: {
      members: true,
      owner: true,
      tasks: {
        include: {
          projects: true,
        },
      },
    },
  });
  if (club == null) {
    return notFound();
  }
  return (
    <>
      <Sidebar club={club} />
      <main className=""></main>
    </>
  );
}
