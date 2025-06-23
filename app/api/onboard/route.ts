// app/api/onboard/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST() {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Upsert to avoid duplicates
  await db.user.upsert({
    where: { clerkId: user.id },
    update: {}, // No updates for now
    create: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName || "",
    },
  });

  return new Response("ok", { status: 200 });
}
