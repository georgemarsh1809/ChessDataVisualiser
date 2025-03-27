import { create } from "zustand";

export const useStore = create((set) => ({
  showSideModal: false,
  toggleSideModal: () =>
    set((state) => ({ showSideModal: !state.showSideModal })),
  tab: "dashboard",
  setTab: (newTab) => set((state) => ({ tab: newTab })),
  firstMoveData: null,
  setFirstMoveData: (data) => set({ firstMoveData: data }),
  resultData: null,
  setResultData: (data) => set({ resultData: data })
}));
