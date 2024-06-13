"use client";

import { toggleModal as toggleClubCreationModal } from "~/components/components/clubs/ClubModal";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Icon, { glyphs } from "@hackclub/icons";
import { toggleModal as toggleTaskCreationModal } from "~/components/components/clubs/CreateTaskModal";

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

export default function NavButtons() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <SignedIn>
        {}
        <NavButton onClick={toggleClubCreationModal} glyph="plus-fill" />
        <NavButton onClick={toggleTaskCreationModal} glyph="post-fill" />

        <NavButton onClick={() => console.log("Settings")} glyph="settings" />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
