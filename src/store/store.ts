import { create } from "zustand";
import { compareGuess, getRandomWord, letterStatus } from "../utils/utils";
import { persist, createJSONStorage } from "zustand/middleware";

export const WORD_LENGTH = 5;

type StoreState = {
  answerWord: string;
  guesses: GuessDetails[];
  addGuess: (guess: string) => void;
  newGame: () => void;
  keyboardLetterState: { [letter: string]: letterStatus };

};

type GuessDetails = {
  guess: string;
  result?: letterStatus[];
};

export const useWordleStore = create<StoreState>()(
  persist(
    (set, get) => {
      const addGuess = (guess: string) => {
        const result = compareGuess(get().answerWord, guess);

        const guesses = get().guesses.concat({
          guess,
          result,
        });

        const keyboardLetterState = get().keyboardLetterState;
        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];

          const currentLetterState = keyboardLetterState[resultGuessLetter];
          switch (currentLetterState) {
            case letterStatus.correct:
              break;
            case letterStatus.present:
              if (r === letterStatus.absent) {
                break;
              }
              break;
            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        });

        set({
          guesses,
          keyboardLetterState,
        });
      };

      return {
        answerWord: getRandomWord(),
        guesses: [],
        keyboardLetterState: {},
        addGuess,
        newGame(initialRows = []) {
          set({
            answerWord: getRandomWord(),
            guesses: [],
            keyboardLetterState: {},
          });

          initialRows.forEach(addGuess);
        },
      };
    },
    {
      name: "wordleStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
