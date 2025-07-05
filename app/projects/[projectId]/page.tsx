import { TaskCreateButton } from "@/app/components/task-create-button";
import { db } from "@/lib/db";
import { ModalProvider } from "@/providers/modal-provider";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { userId } = await auth();
  const { projectId } = await params;

  if (!userId) return notFound();

  const project = await db.project.findUnique({
    where: { id: projectId },
  });

  if (!project) return notFound();

  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  });

  const tasks = await db.task.findMany({
    where: { projectId: projectId, assigneeId: dbUser!.id },
    orderBy: { createdAt: "desc" },
  });

  if (!project) return notFound();

  return (
    <>
      <ModalProvider projectId={projectId} />
      Project Name: {project.title}
      <TaskCreateButton />
      <ul>
        {tasks?.map((task) => (
          <p key={task.id}>{task.title}</p>
        ))}
      </ul>
    </>
  );
}
