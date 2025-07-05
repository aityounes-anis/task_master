import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { projectId: string } }
) {
  const { userId } = await auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const tasks = await db.task.findMany({
    where: {
      projectId: params.projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const { userId } = await auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { title, description, dueDate } = body;

  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser) return new NextResponse("User not found in DB", { status: 404 });

  const project = await db.project.findFirst({
    where: {
      id: params.projectId,
      ownerId: dbUser.id,
    },
  });

  if (!project) return new NextResponse("Project not found", { status: 404 });

  try {
    const task = await db.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: project.id,
        assigneeId: dbUser.id,
      },
    });

    return NextResponse.json(task);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("DB Create Task Error:", {
        message: err.message,
        stack: err.stack,
      });
    } else {
      console.error("Unknown error:", err);
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
