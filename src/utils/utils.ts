import wordBank from "../data/wordBank.json";

export enum letterStatus {
  correct = "correct",
  present = "present",
  absent = "absent",
}

export const gameWonStyle =
  "mx-auto text-center text-green-500 text-2xl p-5 m-5 bg-slate-200 rounded";
export const gameOverStyle =
  "mx-auto text-center text-red-500 text-2xl p-5 m-5 bg-slate-200 rounded";

export function getRandomWord(): string {
  return wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
}

export function compareGuess(word: string, guess: string): letterStatus[] {
  const result: letterStatus[] = new Array(guess.length).fill(
    letterStatus.absent
  );
  const answerLetterCount: Record<string, number> = {};

  // Count occurrences of each letter in the answer
  for (const letter of word) {
    answerLetterCount[letter] = (answerLetterCount[letter] || 0) + 1;
  }

  // Check for "correct" letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = letterStatus.correct;
      answerLetterCount[guess[i]]! -= 1;
    }
  }

  // Check for "present" letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;

    if (word.includes(guess[i]) && answerLetterCount[guess[i]]! > 0) {
      result[i] = letterStatus.present;
      answerLetterCount[guess[i]]! -= 1;
    }
  }

  return result;
}

export function isGuessedValidWord(word: string): boolean {
  return wordBank.includes(word.toLowerCase());
}
