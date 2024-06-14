import { Club, Project, Task, User } from "@prisma/client";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Icon from "@hackclub/icons";
import UpdateClubModal, {
  toggleModal,
} from "~/components/components/clubs/ClubUpdateModal";

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
        <>
          <Icon
            className="w-5 h-5 absolute top-2 right-2 hover:cursor-pointer hover:bg-opacity-80 bg-inherit hover:bg-gray-500 rounded-md"
            glyph="settings"
            size={20}
            onClick={toggleModal}
          />
          <UpdateClubModal club={club} />
        </>
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
            <Icon glyph="link" size={20} className="w-5 h-5 inline-block" />
            <Link href={club.website} target="_blank" className="underline">
              {club.website.replace("https://", "")}
            </Link>
          </li>
        )}
        <li className="flex jusitfy-center items-center gap-1">
          <Icon glyph="idea" className="w-5 h-5 inline-block" size={20} />
          <strong>{totalProjects}</strong> project
          {totalProjects > 1 || (totalProjects == 0 && "s")} shipped
        </li>
        <li className="flex items-center gap-1">
          <Icon glyph="profile" size={20} className="w-5 h-5 inline-block" />
          <strong>{club.members.length}</strong> Member
          {club.members.length > 1 && "s"}
        </li>
        <li className="flex  items-center gap-1">
          <Icon glyph="person" size={20} className="w-5 h-5 inline-block" />
          Run by{" "}
          <strong>
            {club.owner.forename} {club.owner.surname}
          </strong>
        </li>
        <li className="flex justify-center items-center gap-1">
          <Icon glyph="clock" size={20} className="w-5 h-5 inline-block" />
          Registered <strong>{club.createdAt.toLocaleDateString()}</strong>
        </li>
      </ul>
    </aside>
  );
}
