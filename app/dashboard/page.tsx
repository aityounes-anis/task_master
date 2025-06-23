import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { OnboardUser } from "../components/onboard-user";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) return redirect("/sigin-in");

  return (
    <main>
      <OnboardUser />
      <h1>Welcome {user.firstName}</h1>
      <UserButton />
    </main>
  );
}
