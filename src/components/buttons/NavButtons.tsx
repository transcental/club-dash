"use client";

import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { showModal } from "~/components/ClubModal";
import { SignedIn, UserButton } from "@clerk/nextjs";

function NavButton({
  Icon,
  onClick,
}: {
  Icon: React.ComponentType<any>;
  onClick: () => void;
}) {
  return (
    <Icon
      width={24}
      height={24}
      className="hover:cursor-pointer hover:bg-opacity-50 bg-inherit hover:bg-gray-700 rounded-md w-[32] h-[32]"
      onClick={onClick}
    />
  );
}

export default function NavButtons() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <SignedIn>
        <NavButton Icon={PlusIcon} onClick={showModal} />
        <NavButton
          Icon={Cog6ToothIcon}
          onClick={() => console.log("Settings")}
        />
        <UserButton />
      </SignedIn>
    </div>
  );
}
