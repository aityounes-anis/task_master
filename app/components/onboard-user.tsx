"use client";

import { useEffect } from "react";

export function OnboardUser() {
  useEffect(() => {
    fetch("/api/onboard", { method: "POST" });
  }, []);

  return null;
}
