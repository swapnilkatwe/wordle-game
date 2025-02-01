import { useWordleStore } from "../store/store"
import { letterStatus } from "../utils/utils";

const keyStateStyles = {
    [letterStatus.absent]: 'bg-slate-400',
    [letterStatus.present]: 'bg-yellow-500',
    [letterStatus.correct]: 'bg-green-500',
};

type Props = {
    onClick: (letter: string) => void,
    isGameOver: boolean,
    isGameWon: boolean
}

const Keyboard = ({ onClick, isGameOver, isGameWon }: Props) => {

    const keyBoardLetterState = useWordleStore(state => state.keyboardLetterState);
    console.log(keyBoardLetterState);

    const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const letter = e.currentTarget.textContent ?? "";
        console.log("--->" + e.currentTarget.textContent);

        onClick(letter);
    }
    return (
        <div className="my-10 justify-center max-w-md mx-auto">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((key) => {
                let styles = 'rounded font-bold uppercase flex-1 py-2 px-3 gap-1';

                const letterState = keyStateStyles[keyBoardLetterState[key as keyof typeof keyBoardLetterState]];

                if (letterState) {
                    styles += ' text-white px-1 ' + letterState;
                } else if (key !== '') {
                    styles += ' bg-gray-400';
                }

                return <button
                    key={key}
                    className={styles}
                    onClick={onClickButton}
                    disabled={isGameOver || isGameWon}
                >
                    {key}
                </button>
            }
            )}
            <button onClick={onClickButton}>Backspace</button>
            <button onClick={onClickButton}>Enter</button>
        </div>)
}

export default Keyboard