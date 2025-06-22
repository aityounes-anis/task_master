import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <UserButton />
    </main>
  );
}
