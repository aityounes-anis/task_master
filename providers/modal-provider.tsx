"use client";

import { ProjectCreateModal } from "@/components/modals/project-create-modal";
import { TaskCreateModal } from "@/components/modals/task-create-modal";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();

  useEffect(() => setIsMounted(true), [isMounted]);

  if (!isMounted) return null;

  const projectId = params?.projetId as string;

  return (
    <>
      <ProjectCreateModal title="Create New Project" />
      <TaskCreateModal title="Create New Task" projectId={projectId} />
    </>
  );
}
