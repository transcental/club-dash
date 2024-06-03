import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { prisma } from "~/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

function NavIconButton({ Icon }: { Icon: React.ComponentType<any> }) {
  return (
    <Icon
      width={24}
      height={24}
      className="hover:cursor-pointer hover:bg-opacity-50 bg-inherit hover:bg-gray-700 rounded-md w-[32] h-[32]"
    />
  );
}

export default async function Navbar({
  profileButton,
}: {
  profileButton: React.JSX.Element;
}) {
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
      <div className="flex gap-4 justify-center items-center">
        <NavIconButton Icon={PlusIcon} />
        <NavIconButton Icon={Cog6ToothIcon} />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
