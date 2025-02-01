import { useEffect, useState } from "react";
import { useWordleStore, WORD_LENGTH } from "../store/store";
import { isGuessedValidWord } from "../utils/utils";

export default function useGuess() {
  const [guess, setGuess] = useState<string>("");
  const [isValidWord, setIsValidWord] = useState(true);

  const wordleStorage = useWordleStore();

  const isGameOver = wordleStorage.guesses.length === WORD_LENGTH;
  const isGameWon = wordleStorage.guesses.map(eachGuess => eachGuess.guess).includes(wordleStorage.answerWord);

  // HANDLE KEY PRESS EVENTS
  const handleKeyPress = (key: string) => {
    console.log("Pressed: ", key);
    if (guess.length >= WORD_LENGTH) {
      return;
    }
    setGuess((prev) => prev + key);
  };

  const handleBackspace = () => {
    console.log("Backspace");
    if (guess.length === 0) {
      return;
    }
    setGuess((prev) => prev.slice(0, -1));
  };

  const handleEnter = (word: string) => {
    console.log("Entered: ", word);
    addGuessToStore(word);
  };

  function addGuessToStore(newGuess: string) {
    // ADD GUESS TO STORE IF VALID
    if (
      newGuess.length === WORD_LENGTH &&
      wordleStorage.guesses.length < WORD_LENGTH && 
      isGuessedValidWord(newGuess)
    ) {
      wordleStorage.addGuess(newGuess);
      setIsValidWord(true);
      setGuess("");
      return true;
    } else {
      setIsValidWord(false);
    }
    return false;
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      
      if(isGameOver || isGameWon) return;

      if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());

      } else if (event.key === "Backspace") {
        handleBackspace();
        
      } else if (event.key === "Enter") {
        handleEnter(guess);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [guess, isGameOver, isGameWon]);

  return { guess, setGuess, isValidWord, setIsValidWord, handleKeyPress, handleEnter, handleBackspace };
}
