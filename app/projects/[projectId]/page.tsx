import { TaskCreateButton } from "@/app/components/task-create-button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { userId } = await auth();

  if (!userId) return notFound();

  const project = await db.project.findUnique({
    where: { id: params.projectId },
  });

  if (!project) return notFound();

  const tasks = await db.task.findMany({
    where: { projectId: params.projectId, assigneeId: userId },
    orderBy: { createdAt: "desc" },
  });

  if (!project) return notFound();

  return (
    <div>
      {project.title}
      <TaskCreateButton />
      <ul>
        {tasks?.map((task) => (
          <p key={task.id}>{task.title}</p>
        ))}
      </ul>
    </div>
  );
}
