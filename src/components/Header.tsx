import QuestionIcon from "../assets/QuestionIcon.svg";
import { gameOverStyle, gameWonStyle } from "../utils/utils";
import { useWordleStore } from "../store/store";

type Props = {
  handleOnCloseModal: () => void;
  isGameOver: boolean;
  isGameWon: boolean;
  setGuess: (value: string) => void;
};

const Header = ({
  handleOnCloseModal,
  isGameOver,
  isGameWon,
  setGuess,
}: Props) => {
  const wordleStore = useWordleStore();

  return (
    <header className="pt-7">
      <div className="flex relative">
        <h1 className=" text-black text-3xl w-full text-center">Wordle Game</h1>
        <button
          role="info"
          className="absolute right-0"
          onClick={handleOnCloseModal}
        >
          {<img src={QuestionIcon} />}
        </button>
      </div>
      {(isGameOver || isGameWon) && (
        <div role="modal" className={isGameWon ? gameWonStyle : gameOverStyle}>
          <p>{isGameWon ? "You Won!" : "Game Over!"}</p>
          {isGameOver && (
            <p className="text-green-500">Answer: {wordleStore.answerWord}</p>
          )}
          <button
            className="bg-orange-300 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded items-center justify-center mx-0.5 text-xs cursor-pointer"
            onClick={() => {
              wordleStore.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
