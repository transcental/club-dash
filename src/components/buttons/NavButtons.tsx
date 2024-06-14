"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Icon, { glyphs } from "@hackclub/icons";

import CreateClubModal, {
  toggleModal as toggleClubCreationModal,
} from "~/components/clubs/ClubModal";
import CreateTaskModal, {
  toggleModal as toggleTaskCreationModal,
} from "~/components/clubs/CreateTaskModal";
import { Club, User } from "@prisma/client";

function NavButton({
  onClick,
  glyph,
}: {
  onClick: () => void;
  glyph: keyof typeof glyphs;
}) {
  return (
    <Icon
      size={32}
      className="hover:cursor-pointer hover:bg-opacity-50 bg-inherit hover:bg-gray-700 rounded-md"
      onClick={onClick}
      glyph={glyph}
    />
  );
}

type UserWithClubWithLeaderOrUndefined =
  | (User & {
      clubs: (Club & {
        owner: User;
      })[];
    })
  | null
  | undefined;

export default function NavButtons({
  userData,
}: {
  userData: UserWithClubWithLeaderOrUndefined;
}) {
  return (
    <div className="flex gap-4 justify-center items-center">
      <SignedIn>
        {}
        <NavButton onClick={toggleClubCreationModal} glyph="plus-fill" />
        <NavButton onClick={toggleTaskCreationModal} glyph="post-fill" />

        <NavButton onClick={() => console.log("Settings")} glyph="settings" />
        <UserButton />
        <CreateClubModal />
        {userData != undefined && <CreateTaskModal userData={userData} />}
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
