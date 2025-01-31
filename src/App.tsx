import { useState } from "react";
import GridRow from "./components/GridRow";
import { useWordleStore } from "./store/store";
import { gameOverStyle, gameWonStyle } from "./utils/utils";

const GUESS_LIMIT = 5;

function App() {
  const wordleStorage = useWordleStore();
  console.log("-->" + wordleStorage.answerWord);

  const [guess, setGuess] = useState<string>("");

  // FILL THE GRID WITH GUESSES
  let rows = [...wordleStorage.guesses];

  if (rows.length < GUESS_LIMIT) {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_LIMIT - rows.length;
  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  const isGameOver = wordleStorage.guesses.length === GUESS_LIMIT;
  const isGameWon = wordleStorage.guesses.includes(wordleStorage.answerWord);

  // HANDLE KEY PRESS EVENTS
  const handleKeyPress = (key: string) => {
    console.log("Pressed: ", key);
    if (guess.length >= 5) { return }
    setGuess((prev) => prev + key);
  };

  const handleBackspace = () => {
    console.log("Backspace");
    if (guess.length === 0) { return }
    setGuess((prev) => prev.slice(0, -1));
  };

  const handleEnter = (word: string) => {
    console.log("Entered: ", word)
    addGuessToStore(word);
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (addGuessToStore(newGuess)) {
      return;
    }
    setGuess(e.target.value);
  };

  function addGuessToStore(newGuess: string) {
    // ADD GUESS TO STORE IF VALID
    if (newGuess.length === 5 && wordleStorage.guesses.length < GUESS_LIMIT) {
      wordleStorage.addGuess(newGuess);
      setGuess("");
      return true;
    }
    return false;
  }

  return (
    <div className="mx-auto max-w-md">
      {/* Render Header */}
      <header>
        <h1 className="text-orange-500 text-center pt-10 text-3xl">Wordle Game</h1>

        {!isGameOver && !isGameWon &&
          <div className="text-center pt-10">
            <input className="border" type="text" value={guess} onChange={handleChange} disabled={isGameOver} />
          </div>}

        {(isGameOver || isGameWon) &&
          <div
            role="modal"
            className={isGameWon ? gameWonStyle : gameOverStyle}>
              <p>{isGameWon ? "You Won" : "Game Over!"}</p>
              <button 
              className="bg-orange-300 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded items-center justify-center mx-0.5 text-xs cursor-pointer"
              onClick={()=> {
                wordleStorage.newGame();
                setGuess("");
                }}>New Game</button>
            </div>
        }
      </header>


      {/* Render Grid */}
      <main className="grid grid-rows-5 max-w-md mx-auto mt-10">
        {rows.map((word, index) => (
          <GridRow key={index} word={word} />
        ))}
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
