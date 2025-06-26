// app/api/projects/route.ts

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth(); // Get Clerk ID

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title } = body;

  if (!title || typeof title !== "string") {
    return new Response("Invalid title", { status: 400 });
  }

  // Get our internal user (already onboarded)
  const user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const project = await db.project.create({
    data: {
      title,
      ownerId: user.id,
    },
  });

  return Response.json(project);
}
