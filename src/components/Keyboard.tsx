import { useWordleStore } from "../store/store";
import { letterStatus } from "../utils/utils";

const keyStateStyles = {
  [letterStatus.absent]: "bg-slate-400",
  [letterStatus.present]: "bg-yellow-500",
  [letterStatus.correct]: "bg-green-500",
};

const keyboardKeys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

type Props = {
  onClick: (letter: string) => void;
  isGameOver: boolean;
  isGameWon: boolean;
};

const Keyboard = ({ onClick, isGameOver, isGameWon }: Props) => {
  const keyBoardLetterState = useWordleStore(
    (state) => state.keyboardLetterState
  );

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent ?? "";
    onClick(letter.toUpperCase());
  };
  return (
    <div className={`flex flex-col`}>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div key={rowIndex} className="my-2 flex justify-center space-x-1">
          {keyboardRow.map((key, index) => {
            let styles = "rounded font-bold uppercase flex-1 py-2";

            const letterState =
              keyStateStyles[
                keyBoardLetterState[key as keyof typeof keyBoardLetterState]
              ];

            if (letterState) {
              styles += " text-white px-1 " + letterState;
            } else if (key !== "") {
              styles += " bg-gray-100";
            }

            return (
              <button
                onClick={onClickButton}
                key={key + index}
                className={styles}
                disabled={isGameOver || isGameWon}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
