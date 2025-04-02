import { create } from "zustand";

export const useStore = create((set) => ({
  showSideModal: false,
  toggleSideModal: () =>
    set((state) => ({ showSideModal: !state.showSideModal })),
  tab: "dashboard",
  setTab: (newTab) => set((state) => ({ tab: newTab })),
  playerProfile: "Alekhine",
  setPlayerProfile: (player) => set({ playerProfile: player }),
  allGamesData: [],
  setAllGamesData: (data) => set({ allGamesData: data }),
  pageNumber: 1,
  setPageNumber: (data) => set({ pageNumber: data }),
  firstMoveData: null,
  setFirstMoveData: (data) => set({ firstMoveData: data }),
  resultData: null,
  setResultData: (data) => set({ resultData: data }),
  totalGameData: null,
  setTotalGameData: (data) => set({ totalGameData: data }),
  gameId: 1,
  setGameId: (id) => set({ gameId: id }),
  currentGame: 1,
  setCurrentGame: (game) => set({ currentGame: game })


}));
