"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";

export function NewProjectButton() {
  const { open } = useModalStore();

  return <Button onClick={() => open("projectCreate")}>+ New Project</Button>;
}
