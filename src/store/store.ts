import { create } from "zustand";
import { getRandomWord } from "../utils/utils";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  answerWord: string;
  guesses: string[];
  addGuess: (guess: string) => void;
  newGame: () => void;
};
export const useWordleStore = create<StoreState>()(
    persist(
        (set) => ({
            answerWord: getRandomWord(),
            guesses: [],
            addGuess: (guess: string) =>
                set((state) => ({ guesses: [...state.guesses, guess] })),
            newGame: () => set({ answerWord: getRandomWord(), guesses: [] }),
        }),
        {
            name: "wordleStorage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

