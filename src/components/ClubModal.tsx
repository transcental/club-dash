"use client";

import createClub from "~/actions/createClub";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CreateClubModal() {
  return (
    <dialog
      id="create-club"
      className="bg-slate-500 text-gray-100 p-8 rounded-md max-w-sm"
    >
      <XMarkIcon
        className="absolute right-4 top-4 hover:bg-opacity-80 bg-inherit hover:cursor-pointer"
        width={24}
        height={24}
        onClick={toggleModal}
        // tabIndex={1}
        // onKeyDown={toggleModal}
      />
      <h2 className="text-xl font-semibold text-center text-white">
        Create a Club
      </h2>
      <p className="text-gray-300">
        By creating a club, you agree that you and all of your club members will
        abide by the{" "}
        <Link
          href="https://hackclub.com/conduct/"
          target="_blank"
          className="hover:underline text-gray-200"
        >
          Code of Conduct
        </Link>
        .
      </p>
      <br />
      <form action={createClub} className="flex flex-col justify-center">
        <label htmlFor="name">Club Name</label>
        <input
          type="text"
          id="name"
          name="name"
          maxLength={30}
          className="rounded-sm text-black p-2"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          maxLength={500}
          className="rounded-sm text-black p-2"
        />
        <br />
        <button
          className="bg-green-500 rounded-md w-min px-4 py-2 self-center hover:underline text-black hover:shadow hover:bg-opacity-80 hover:cursor-pointer"
          type="submit"
        >
          Create
        </button>
      </form>
    </dialog>
  );
}

export function toggleModal() {
  const dialog: HTMLDialogElement | null =
    document.querySelector("dialog#create-club");
  // if dialog is open, show modal else hide
  dialog?.open ? dialog?.close() : dialog?.showModal();
}
