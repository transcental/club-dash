import { prisma } from "~/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import CreateClubModal from "~/components/ClubModal";
import NavButtons from "~/components/buttons/NavButtons";

export default async function Navbar({
  profileButton,
}: {
  profileButton: React.JSX.Element;
}) {
  "use server";
  const user = await currentUser();
  // Fetch clubs user is in using prisma
  let userData;
  if (user) {
    userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        clubs: true,
      },
    });
  }

  return (
    <>
      <header className="flex space-between items-center justify-between m-4">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-2xl font-semibold">Clubs Dash</h1>
          {user && (
            <select className="text-black">
              <option>Global</option>
              {userData?.clubs?.map((club) => (
                <option key={club.id}>{club.name}</option>
              ))}
            </select>
          )}
        </div>
        <NavButtons />
      </header>
      <CreateClubModal />
    </>
  );
}
