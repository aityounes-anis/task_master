import { create } from "zustand";

type ModalType = "projectCreate" | "taskCreate" | "taskEdit" | null;

interface ModalState {
  type: ModalType;
  data?: unknown;
  isOpen: boolean;
  open: (type: ModalType, data?: unknown) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  open: (type, data) => set({ type, data, isOpen: true }),
  close: () => set({ type: null, data: null, isOpen: false }),
}));
