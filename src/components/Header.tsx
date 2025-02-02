import QuestionIcon from "../assets/QuestionIcon.svg";

type Props = {
  handleOnCloseModal: () => void;
  isGameOver: boolean;
  isGameWon: boolean;
  setGuess: (value: string) => void;
};

const Header = ({ handleOnCloseModal }: Props) => {
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
    </header>
  );
};

export default Header;
