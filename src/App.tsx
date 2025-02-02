import { useState } from "react";
import { useEffect } from "react";
import GridRow from "./components/GridRow";
import useGuess from "./hooks/useGuess";
import { useWordleStore, WORD_LENGTH } from "./store/store";
import Keyboard from "./components/Keyboard";
import GameInfoModal from "./components/GameInfoModal";
import Header from "./components/Header";

function App() {
  const wordleStorage = useWordleStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    guess,
    setGuess,
    isValidWord,
    setIsValidWord,
    handleKeyPress,
    handleEnter,
    handleBackspace,
  } = useGuess();

  useEffect(() => {
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
  const isGameWon = wordleStorage.guesses
    .map((eachGuess) => eachGuess.guess)
    .includes(wordleStorage.answerWord);

  function handleOnCloseModal() {
    setModalIsOpen((prev) => !prev);
  }

  return (
    <>
      {/* Game Information Modal */}
      <GameInfoModal isOpen={modalIsOpen} onClose={handleOnCloseModal} />

      <div className="mx-auto max-w-md">
        {/* Render Header */}
        <Header
          isGameOver={isGameOver}
          isGameWon={isGameWon}
          setGuess={setGuess}
          handleOnCloseModal={handleOnCloseModal}
        />

        {/* Render Grid */}
        <main className="relative grid grid-rows-5 max-w-md mx-auto m-5">
          {rows.map(({ guess, result }, index) => (
            <GridRow
              key={index}
              word={guess}
              result={result}
              animateRowCss={
                !isValidWord && currentRowIndex === index
                  ? "animate-bounce"
                  : ""
              }
            />
          ))}

          {!isValidWord && (
            <h2 className="absolute inset-x-0 mx-auto top-1/2 text-center text-red-500 text-xl bg-slate-100 w-full py-2 -left-5">
              This Word is not in our dictionary.Please try again.
            </h2>
          )}
        </main>

        {/* Render Keyboard */}
        <Keyboard
          onClick={(letter) => {
            switch (letter) {
              case "BACKSPACE":
                handleBackspace();
                break;
              case "ENTER":
                handleEnter(guess);
                break;
              default:
                handleKeyPress(letter);
                break;
            }
          }}
          isGameOver={isGameOver}
          isGameWon={isGameWon}
        />
      </div>
    </>
  );
}

export default App;
