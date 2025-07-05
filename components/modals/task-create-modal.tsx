"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { TaskCreateForm } from "../forms/task-create-form";

interface TaskCreateModalProps {
  title: string;
  projectId: string;
}

export function TaskCreateModal({ title, projectId }: TaskCreateModalProps) {
  const { isOpen, type, close } = useModalStore();
  const isVisible = isOpen && type === "taskCreate";

  return (
    <Dialog open={isVisible} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <TaskCreateForm params={{ projectId }} />
      </DialogContent>
    </Dialog>
  );
}
