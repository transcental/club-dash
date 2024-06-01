import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Club Dash</h1>
      <h2>Login to get started</h2>
      <a href="/login" className="bg-amber-100 p-2 rounded-md text-black">
        Login
      </a>
    </main>
  );
}
