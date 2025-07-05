"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";

export function TaskCreateButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button onClick={() => open("taskCreate")}>Create new Task</Button>
    </>
  );
}
