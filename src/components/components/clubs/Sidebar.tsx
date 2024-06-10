import { Club, User } from "@prisma/client";

type ClubWithMembersAndOwner = Club & {
  members: User[];
  owner: User;
};

export default function Sidebar({ club }: { club: ClubWithMembersAndOwner }) {
  return (
    <aside className="w-64 h-1/3 bg-slate-500 flex flex-col items-center justify-evenly rounded-md text-center p-4">
      <div className="flex items-center justify-evenly w-full">
        <span className="bg-green-500 rounded-full w-20 h-20"></span>
        <h1 className="text-xl font-bold">{club.name}</h1>
      </div>
      <p className="text-sm text-gray-300">{club.description}</p>
      <hr className="w-1/4 m-8 opacity-70" />
      <ul className="list-none text-gray-400">
        <li>
          Run by {club.owner.forename} {club.owner.surname}
        </li>
        <li>Created {club.createdAt.toLocaleDateString()}</li>
      </ul>
    </aside>
  );
}
