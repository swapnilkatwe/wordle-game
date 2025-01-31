// import { useEffect, useState } from "react";
import { useEffect } from "react";
import GridRow from "./components/GridRow";
import useGuess from "./hooks/useGuess";
import { useWordleStore, WORD_LENGTH } from "./store/store";
import { gameOverStyle, gameWonStyle } from "./utils/utils";

function App() {
  const wordleStorage = useWordleStore();
  console.log("-->" + wordleStorage.answerWord);

  const { guess, setGuess, isValidWord, setIsValidWord, handleKeyPress, handleEnter, handleBackspace } = useGuess();

  useEffect(() => {
    // let id: any;
    if (!isValidWord) {
      setTimeout(() => setIsValidWord(true), 2000);
    }
  }, [isValidWord, setIsValidWord]);

  // FILL THE GRID WITH GUESSES
  let rows = [...wordleStorage.guesses];
  let currentRowIndex = 0;
  if (rows.length < WORD_LENGTH) {
    currentRowIndex = rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = WORD_LENGTH - rows.length;
  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  const isGameOver = wordleStorage.guesses.length === WORD_LENGTH;
  const isGameWon = wordleStorage.guesses.map(eachGuess => eachGuess.guess).includes(wordleStorage.answerWord);


  return (
    <div className="mx-auto max-w-md">
      {/* Render Header */}
      <header>
        <h1 className="text-orange-500 text-center pt-10 text-3xl">Wordle Game</h1>
        {(isGameOver || isGameWon) &&
          <div
            role="modal"
            className={isGameWon ? gameWonStyle : gameOverStyle}>
            <p>{isGameWon ? "You Won!" : "Game Over!"}</p>
            <button
              className="bg-orange-300 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded items-center justify-center mx-0.5 text-xs cursor-pointer"
              onClick={() => {
                wordleStorage.newGame();
                setGuess("");
              }}>New Game</button>
          </div>
        }
      </header>

      {/* Render Grid */}
      <main className="relative grid grid-rows-5 max-w-md mx-auto mt-10">
        {rows.map(({ guess, result }, index) => (
          <GridRow
            key={index}
            word={guess}
            result={result}
            animateRowCss={(!isValidWord && currentRowIndex === index) ? "animate-bounce" : ""} />
        ))}

        {!isValidWord && <h2
          className="absolute inset-x-0 mx-auto top-1/2 text-center text-red-500 text-xl bg-slate-100 w-full py-2 -left-5">
            This Word is not in our dictionary.Please try again.
        </h2>}

      </main>

      {/* Render Keyboard */}
      <div className="my-10 justify-center max-w-md mx-auto">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded items-center justify-center mx-0.5 text-xs cursor-pointer"
            onClick={() => handleKeyPress(letter)}
            disabled={isGameOver || isGameWon}>
            {letter}
          </button>
        ))}
        <button onClick={handleBackspace}>Backspace</button>
        <button onClick={() => { handleEnter(guess) }}>Enter</button>
      </div>
    </div>
  )
}

export default App
