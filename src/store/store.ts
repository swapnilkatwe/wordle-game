import { create } from "zustand";
import { compareGuess, getRandomWord, letterStatus } from "../utils/utils";
import { persist, createJSONStorage } from "zustand/middleware";
import { enc, AES } from "crypto-js";

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
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          // get data
          const encryptedData = localStorage.getItem(key);
          // decrypt it
          return encryptedData ? decrypt(encryptedData) : null;
        },
        setItem: (key, data) => {
          // before storing it first decrypt it
          const encryptedData = encrypt(data);
          // now store it
          localStorage.setItem(key, encryptedData);
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    }
  )
);

// Encryption and decription
const secretKey = "swapnil-wordleo-game-2025";

const encrypt = (data: string) => {
  return AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decrypt = (encryptedData: string | CryptoJS.lib.CipherParams) => {
  const bytes = AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(enc.Utf8));
};
