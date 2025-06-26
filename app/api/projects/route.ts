import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth(); // Get Clerk ID

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name } = body;

  if (!name || name.length < 1) {
    return new NextResponse("Invalid name", { status: 400 });
  }

  // Get our internal user (already onboarded)
  const user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  try {
    const project = await db.project.create({
      data: {
        title: name,
        ownerId: user.id,
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("[PROJECT_CREATE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
