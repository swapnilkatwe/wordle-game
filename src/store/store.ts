import { create } from "zustand";
import { getRandomWord } from "../utils/utils";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  answerWord: string;
  guesses: string[];
  addGuess: (guess: string) => void;
};
export const useWordleStore = create<StoreState>()(
    persist(
        (set) => ({
            answerWord: getRandomWord(),
            guesses: ["APPLE", "BANAN", "FRUIT"],
            addGuess: (guess: string) =>
                set((state) => ({ guesses: [...state.guesses, guess] })),
        }),
        {
            name: "wordleStorage",
            // getStorage: () => localStorage, 
            storage: createJSONStorage(() => localStorage),
        }
    )
);

