"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { ProjectCreateForm } from "../forms/project-create-form";

interface ProjectCreateModalProps {
  title: string;
}

export function ProjectCreateModal({ title }: ProjectCreateModalProps) {
  const { isOpen, type, close } = useModalStore();
  const isVisible = isOpen && type === "projectCreate";

  return (
    <Dialog open={isVisible} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <ProjectCreateForm />
      </DialogContent>
    </Dialog>
  );
}
