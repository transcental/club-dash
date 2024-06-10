"use client";

import updateClub from "~/actions/updateClub";
import Icon from "@hackclub/icons";
import { Club } from "@prisma/client";
import Image from "next/image";

export default function UpdateClubModal({ club }: { club: Club }) {
  function updateImage(event: React.ChangeEvent<HTMLInputElement>) {
    const img: HTMLImageElement | null = document.querySelector(
      "img#club-logo-preview",
    );
    if (img) {
      img.src = event.target.value;
    }
  }

  return (
    <dialog
      id="update-club"
      className="bg-slate-500 text-gray-100 p-8 rounded-md w-1/4"
    >
      <Icon
        glyph="view-close"
        className="absolute right-3 top-3 hover:cursor-pointer hover:bg-opacity-80 bg-inherit hover:bg-gray-700 rounded-md"
        size={32}
        onClick={toggleModal}
        // tabIndex={1}
        // onKeyDown={toggleModal}
      />
      <div className="flex items-center justify-evenly w-1/2">
        <Image
          src={
            club?.logo
              ? club.logo
              : "https://assets.hackclub.com/icon-square.svg"
          }
          alt="Club Logo"
          className="w-20 h-20 rounded-lg"
          id="club-logo-preview"
          width={80}
          height={80}
          onError={(e) => {
            e.currentTarget.src = "https://assets.hackclub.com/icon-square.svg";
          }}
        />
        <h2 className="text-xl font-semibold text-center text-white">
          {club.name}
        </h2>
      </div>
      <br />
      <form
        action={updateClub}
        className="flex flex-col justify-center text-black text-base"
      >
        <input id="id" name="id" type="hidden" value={club.id} />
        <label htmlFor="name" className="text-gray-100 font-bold">
          Club Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          maxLength={30}
          className="rounded-sm p-2 w-1/2 self-center"
          defaultValue={club.name}
        />
        <label htmlFor="description" className="text-gray-100 font-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          maxLength={500}
          className="rounded-sm p-2 w-1/2 self-center"
          defaultValue={club.description}
        />
        <label className="text-gray-100 font-bold" htmlFor="logo">
          Logo URL
        </label>
        <input
          defaultValue={club.logo ? club.logo : undefined}
          placeholder="https://assets.hackclub.com/icon-square.svg"
          onChange={updateImage}
          type="url"
          id="logo"
          name="logo"
          className="rounded-sm p-2 w-1/2 self-center"
        />
        <label htmlFor="website" className="text-gray-100 font-bold">
          Website
        </label>
        <input
          defaultValue={club.website ? club.website : undefined}
          id="website"
          name="website"
          className="rounded-sm p-2 w-1/2 self-center"
        />
        <br />
        <button
          className="bg-green-500 rounded-md w-min px-4 py-2 self-center hover:underline text-black hover:shadow hover:bg-opacity-80 hover:cursor-pointer"
          type="submit"
        >
          Update
        </button>
      </form>
    </dialog>
  );
}

export function toggleModal() {
  const dialog: HTMLDialogElement | null =
    document.querySelector("dialog#update-club");
  // if dialog is open, show modal else hide
  dialog?.open ? dialog?.close() : dialog?.showModal();
}
