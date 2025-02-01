
type Props = {
    onClick: (letter: string) => void
}

const Keyboard = ({ onClick }: Props) => {

    const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const letter = e.currentTarget.textContent ?? "";
        console.log("--->" + e.currentTarget.textContent);

        onClick(letter);
    }
    return (
        <div className="my-10 justify-center max-w-md mx-auto">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <button
                    key={letter}
                    className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded items-center justify-center mx-0.5 text-xs cursor-pointer"
                    onClick={onClickButton}
                // disabled={isGameOver || isGameWon}
                >
                    {letter}
                </button>
            ))}
            <button onClick={onClickButton}>Backspace</button>
            <button onClick={onClickButton}>Enter</button>
        </div>)
}

export default Keyboard