"use client";

import createClub from "~/actions/createClub";
import Link from "next/link";
import Icon from "@hackclub/icons";
import {useState} from "react";
import {Club, User} from "@prisma/client";
import {useUser} from "@clerk/nextjs";

type UserWithClubWithLeader = User & {
    clubs: (Club & {
        owner: User;
    })[];
}

export default function CreateClubModal() {
    const [data, setData] = useState<UserWithClubWithLeader>();
    fetch("/api/users/me").then((res) => res.json()).then((data) => setData(data));

    const {isSignedIn, user, isLoaded} = useUser()
    return (
        <dialog
            id="create-task"
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
                Create Task
            </h2>
            <p className="text-gray-300">
                A task is like an assignment - any member can attach projects to it! We
                recommend one task per session. The task & all projects must follow the
                <Link
                    href="https://hackclub.com/conduct/"
                    target="_blank"
                    className="hover:underline text-gray-200"
                >
                    Code of Conduct
                </Link>
                .
            </p>
            <br/>
            <form action={createClub} className="flex flex-col justify-center">
                <label htmlFor="name">Club</label>
                <select>
                    {(data && isSignedIn) && data.clubs.map((club) => (
                        <>{(club.ownerId === user?.id) && (
                            <option key={club.id} value={club.id}>{club.name}</option>
                        )}</>
                    ))}
                </select>

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
                <br/>
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
        document.querySelector("dialog#create-task");
    // if dialog is open, show modal else hide
    dialog?.open ? dialog?.close() : dialog?.showModal();
}
