import { Club, Project, Task, User } from "@prisma/client";
import {
  ClipboardIcon,
  ClockIcon,
  Cog6ToothIcon,
  LinkIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

type ClubWithMembersOwnerTasksProjects = Club & {
  members: User[];
  owner: User;
  tasks: Task & { projects: Project[] }[];
};

export default async function Sidebar({
  club,
}: {
  club: ClubWithMembersOwnerTasksProjects;
}) {
  const user = await currentUser();
  const totalProjects = club.tasks.reduce(
    (total, task) => total + task.projects.length,
    0,
  );
  return (
    <aside className="w-64 h-1/3 bg-slate-500 flex flex-col items-center justify-evenly rounded-md text-center p-4 fixed left-1/4 bottom-1/2">
      {user?.id === club.ownerId && (
        <Cog6ToothIcon className="w-5 h-5 absolute top-2 right-2" />
      )}
      <div className="flex items-center justify-evenly w-full">
        <Image
          src={
            club?.logo
              ? club.logo
              : "https://assets.hackclub.com/icon-square.svg"
          }
          width={80}
          height={80}
          alt="Club logo"
          className="rounded-lg"
        />
        <h1 className="text-xl font-bold">{club.name}</h1>
      </div>
      <p className="text-sm text-gray-300">{club.description}</p>
      <hr className="w-1/4 m-8 opacity-70" />
      <ul className="list-none text-gray-200">
        {club.website && (
          <li className="flex items-center gap-1">
            <LinkIcon className="w-5 h-5 inline-block" />
            <Link href={club.website} target="_blank" className="underline">
              {club.website.replace("https://", "")}
            </Link>
          </li>
        )}
        <li className="flex jusitfy-center items-center gap-1">
          <ClipboardIcon className="w-5 h-5 inline-block" />
          <strong>{totalProjects}</strong> project
          {totalProjects > 1 || (totalProjects == 0 && "s")} shipped
        </li>
        <li className="flex items-center gap-1">
          <UserGroupIcon className="w-5 h-5 inline-block" />
          <strong>{club.members.length}</strong> Member
          {club.members.length > 1 && "s"}
        </li>
        <li className="flex  items-center gap-1">
          <UserCircleIcon className="w-5 h-5 inline-block" />
          Run by{" "}
          <strong>
            {club.owner.forename} {club.owner.surname}
          </strong>
        </li>
        <li className="flex justify-center items-center gap-1">
          <ClockIcon className="w-5 h-5 inline-block" />
          Registered <strong>{club.createdAt.toLocaleDateString()}</strong>
        </li>
      </ul>
    </aside>
  );
}
