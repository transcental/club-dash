"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Icon, { glyphs } from "@hackclub/icons";

import CreateClubModal, {
  toggleModal as toggleClubCreationModal,
} from "~/components/clubs/ClubModal";
import CreateTaskModal, {
  toggleModal as toggleTaskCreationModal,
} from "~/components/clubs/CreateTaskModal";
import { Club, Task, User } from "@prisma/client";
import CreateProjectModal, {
  toggleModal as toggleProjectCreationModal,
} from "~/components/clubs/CreateProjectModal";

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
        tasks: Task[];
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
        <NavButton onClick={toggleClubCreationModal} glyph="plus-fill" />
        <NavButton onClick={toggleTaskCreationModal} glyph="copy" />
        <NavButton onClick={toggleProjectCreationModal} glyph="post-fill" />

        <NavButton onClick={() => console.log("Settings")} glyph="settings" />
        <UserButton />
        <CreateClubModal />
        {userData?.clubs && <CreateProjectModal userData={userData} />}
        {userData?.clubs && <CreateTaskModal userData={userData} />}
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
