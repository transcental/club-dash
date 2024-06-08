import createClub from "~/actions/createClub";

export default async function CreateClubModal() {
  return (
    <dialog id="create-club">
      <form action={createClub}>
        <label htmlFor="name">Club Name</label>
        <input type="text" id="name" name="name" maxLength={30} />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" maxLength={500} />
        <button type="submit">Create</button>
      </form>
    </dialog>
  );
}

export function showModal() {
  const dialog: HTMLDialogElement | null =
    document.querySelector("dialog#create-club");
  dialog?.showModal();
}
