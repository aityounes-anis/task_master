"use client";

import { ProjectCreateModal } from "@/components/modals/project-create-modal";
import { TaskCreateModal } from "@/components/modals/task-create-modal";
import { useState, useEffect } from "react";

interface ModalProviderProps {
  projectId?: string;
}

export function ModalProvider({ projectId }: ModalProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <ProjectCreateModal title="Create New Project" />
      <TaskCreateModal title="Create New Task" projectId={projectId!} />
    </>
  );
}
