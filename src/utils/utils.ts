import wordBank from "../data/wordBank.json";

export enum letterStatus {
  correct = "correct",
  present = "present",
  absent = "absent",
}

export const gameWonStyle = "mx-auto text-center text-green-500 text-2xl p-5 m-5 bg-slate-200 rounded";
export const gameOverStyle = "mx-auto text-center text-red-500 text-2xl p-5 m-5 bg-slate-200 rounded";


export function getRandomWord(): string {
  return wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
}

export function compareGuess(word: string, guess: string): letterStatus[] {
  const wordArray = word.split("");
  const guessArray = guess.split("");

  return guessArray.map((letter, index) => {
    const guessLetterCount = guessArray.filter((l) => l === letter).length;
    const wordLetterCount = wordArray.filter((l) => l === letter).length;

    if (guessLetterCount <= wordLetterCount) {
      return letter === wordArray[index]
        ? letterStatus.correct
        : letterStatus.present;
    } else if (guessLetterCount > wordLetterCount) {
      return letter === wordArray[index]
        ? letterStatus.correct
        : letterStatus.absent;
    } else {
      return letterStatus.absent;
    }
  });
}

