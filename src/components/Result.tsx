import { gameOverStyle, gameWonStyle } from "../utils/utils";
import { useWordleStore } from "../store/store";

type Props = {
  isGameOver: boolean;
  isGameWon: boolean;
  setGuess: (value: string) => void;
};

function Result({ isGameOver, isGameWon, setGuess }: Props) {
  const wordleStore = useWordleStore();

  return (
    <div role="modal" className={isGameWon ? gameWonStyle : gameOverStyle}>
      <p>{isGameWon ? "You Won!" : "Game Over!"}</p>
      {isGameOver && (
        <p className="text-green-500">Your Answer: {wordleStore.answerWord}</p>
      )}
      <button
        className="bg-orange-300 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded items-center justify-center mx-0.5 text-xs cursor-pointer"
        onClick={() => {
          wordleStore.newGame();
          setGuess("");
        }}
      >
        {isGameWon ? "New Game" : "Try Again"}
      </button>
    </div>
  );
}

export default Result;
