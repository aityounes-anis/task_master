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

  if (!title || title.length < 1) {
    return new NextResponse("Invalid title", { status: 400 });
  }

  const project = await db.project.findUnique({
    where: {
      id: params.projectId,
      ownerId: userId,
    },
  });

  if (!project) return new NextResponse("Project not found", { status: 404 });

  const task = await db.task.create({
    data: {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      projectId: project.id,
      assigneeId: userId, // for now, assign to self
    },
  });

  return NextResponse.json(task);
}
