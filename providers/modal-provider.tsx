"use client";

import { ProjectCreateModal } from "@/components/modals/project-create-modal";
import { useState, useEffect } from "react";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <ProjectCreateModal title="Create New Project" />
    </>
  );
}
