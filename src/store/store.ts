import { create } from "zustand";
import { compareGuess, getRandomWord, letterStatus } from "../utils/utils";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  answerWord: string;
  guesses: GuessDetails[];
  addGuess: (guess: string) => void;
  newGame: () => void;
};

type GuessDetails = {
  guess: string;
  result?: letterStatus[];
};

export const useWordleStore = create<StoreState>()(
  persist(
    (set) => ({
      answerWord: getRandomWord(),
      guesses: [],
      addGuess: (guess: string) =>
        set((state) => ({
          guesses: [
            ...state.guesses,
            {
              guess,
              result: compareGuess(state.answerWord, guess),
            },
          ],
        })),
      newGame: () => set({ answerWord: getRandomWord(), guesses: [] }),
    }),
    {
      name: "wordleStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
