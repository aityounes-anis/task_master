"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Button } from "../ui/button";

export function ProjectCreateModal() {
  const { isOpen, type, close } = useModalStore();
  const [title, setTitle] = useState("");

  const isVisible = isOpen && type === "projectCreate";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setTitle("");
      close();
      location.reload(); // or router.refresh()
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border px-3 py-2 rounded"
            type="text"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button>+ Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
