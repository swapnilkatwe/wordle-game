import GridRow from "./components/GridRow";

function App() {

  const handleKeyPress = (key: string) => {
    console.log("Pressed: ", key);
  };

  const handleBackspace = () => {
    console.log("Backspace");
  };

  const handleEnter = (word: string) => {
    console.log("Entered: ", word);
  };

  return (
    <>
      <header>
        <h1 className="text-orange-500 text-center pt-10 text-3xl">Wordle Game</h1>
      </header>

      {/* Render Grid */}
      <main className="grid grid-rows-5 max-w-md mx-auto mt-10">
        <GridRow word="apple" />
        <GridRow word="qrstu" />
        <GridRow word="abcde" />
        <GridRow word="ahijk" />
        <GridRow word="a" />
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
        <button onClick={() => { handleEnter("fruit") }}>Enter</button>
      </div>
    </>
  )
}

export default App
