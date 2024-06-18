import { prisma } from "~/lib/prisma";
import Sidebar from "~/components/clubs/Sidebar";
import { notFound } from "next/navigation";
import ProjectDisplay from "~/components/ProjectDisplay";

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
  if (!club) {
    return notFound();
  }

  const projects = club.tasks.flatMap((task) =>
    [...task.projects].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    ),
  );

  return (
    <>
      <Sidebar club={club} />
      <main className="">
        <ProjectDisplay projects={projects} />
      </main>
    </>
  );
}
