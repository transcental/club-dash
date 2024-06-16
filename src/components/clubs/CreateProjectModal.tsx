"use client";

import Link from "next/link";
import Icon from "@hackclub/icons";
import { Club, Task, User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import createProject from "~/actions/createProject";
import { useState } from "react";

type UserWithClubWithLeader = User & {
  clubs: (Club & {
    owner: User;
    tasks: Task[];
  })[];
};

export default function CreateProjectModal({
  userData,
}: {
  userData: UserWithClubWithLeader;
}) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [clubId, setClubId] = useState<string>();
  return (
    <dialog
      id="create-project"
      className="bg-slate-500 text-gray-100 p-8 rounded-md max-w-sm"
    >
      <Icon
        glyph="view-close"
        className="absolute right-4 top-4 hover:cursor-pointer hover:bg-opacity-80 bg-inherit hover:bg-gray-700 rounded-md"
        size={32}
        onClick={toggleModal}
        // tabIndex={1}
        // onKeyDown={toggleModal}
      />
      <h2 className="text-xl font-semibold text-center text-white">
        Post Project
      </h2>
      <p className="text-gray-300">
        Congrats on your project 🎉! Let&apos;s get it out in the world!
        Remember, it must follow the{" "}
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
      <form action={createProject} className="flex flex-col justify-center">
        <label htmlFor="club">Club</label>
        <select
          required
          className="text-black rounded-sm p-2"
          id="club"
          name="club"
          onChange={(e) => {
            console.log(e.target.value);
            setClubId(e.target.value);
          }}
        >
          <option value="0" disabled>
            Select a club
          </option>
          {userData?.clubs?.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Celeste: Sprig Edition"
          className="rounded-sm text-black p-2"
          name="name"
          id="name"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          maxLength={500}
          className="rounded-sm text-black p-2"
          placeholder="A version of Celeste, the 2018 indie platformer, made for the Sprig platform."
        />
        <label htmlFor="link">Link</label>
        <input
          type="url"
          placeholder="https://sprig.hackclub.com/share/29Frbn065qJvwhbtuSuT"
          className="rounded-sm text-black p-2"
          name="link"
          id="link"
          required
        />
        <label htmlFor="gitRepo">Code</label>
        <input
          type="url"
          placeholder="https://github.com/hackclub/sprig/blob/main/games/celeste.js"
          className="rounded-sm text-black p-2"
          name="gitRepo"
          id="gitRepo"
        />
        <label htmlFor="task">Task</label>
        <select
          className="text-black rounded-sm p-2"
          id="task"
          name="task"
          required
        >
          <option value="0">No task</option>
          {userData.clubs
            .find((club) => club.id == clubId)
            ?.tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
        </select>

        <br />
        <button
          className="bg-green-500 rounded-md w-min px-4 py-2 self-center hover:underline text-black hover:shadow hover:bg-opacity-80 hover:cursor-pointer"
          type="submit"
        >
          Post
        </button>
      </form>
    </dialog>
  );
}

export function toggleModal() {
  const dialog: HTMLDialogElement | null = document.querySelector(
    "dialog#create-project",
  );
  // if dialog is open, show modal else hide
  dialog?.open ? dialog?.close() : dialog?.showModal();
}
