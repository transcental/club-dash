"use client";

import { toggleModal } from "~/components/components/clubs/ClubModal";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Icon, { glyphs } from "@hackclub/icons";

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
        <NavButton onClick={toggleModal} glyph="plus-fill" />
        <NavButton onClick={() => console.log("Settings")} glyph="settings" />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
