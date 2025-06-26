import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) redirect("/dashboard");

  return (
    <div>
      <h1>This is the Home Page</h1>
    </div>
  );
}
