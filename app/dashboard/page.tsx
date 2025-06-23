import { UserButton } from "@clerk/nextjs";

export default async function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <UserButton />
    </main>
  );
}
