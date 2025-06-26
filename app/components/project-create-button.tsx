"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";

export function ProjectCreateButton() {
  const { open } = useModalStore();

  return (
    <>
      <Button onClick={() => open("projectCreate")}>Create new Projet</Button>
    </>
  );
}
