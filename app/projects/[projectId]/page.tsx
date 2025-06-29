import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await db.project.findUnique({
    where: { id: params.projectId },
  });

  if (!project) return notFound();

  return <div>{project.title}</div>;
}
