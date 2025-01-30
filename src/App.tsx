import { useState } from "react";
import GridRow from "./components/GridRow";
import { useWordleStore } from "./store/store";

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
    
    if(addGuessToStore(newGuess)) {
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
    <>
      <header>
        <h1 className="text-orange-500 text-center pt-10 text-3xl">Wordle Game</h1>
        <div className="text-center pt-10">
          <input className="border" type="text" value={guess} onChange={handleChange} />
        </div>
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
            onClick={() => handleKeyPress(letter)}>
            {letter}
          </button>
        ))}
        <button onClick={handleBackspace}>Backspace</button>
        <button onClick={() => { handleEnter(guess) }}>Enter</button>
      </div>
    </>
  )
}

export default App
