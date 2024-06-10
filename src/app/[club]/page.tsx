import { prisma } from "~/lib/prisma";
import Sidebar from "~/components/components/clubs/Sidebar";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { club: string } }) {
  console.log(params.club);
  const parsedName = decodeURIComponent(params.club);
  const club = await prisma.club.findUnique({
    where: {
      name: parsedName,
    },
    include: {
      members: true,
      owner: true,
    },
  });
  if (club == null) {
    return notFound();
  }
  return (
    <main className="flex flex-row ">
      <Sidebar club={club} />
      <main className="">
        <h1>{parsedName}</h1>
        <p>{club?.description}</p>
        <p>{club?.owner?.forename}</p>
      </main>
    </main>
  );
}
