import { compareGuess, randomWord } from '../utils/utils';
import Cell from './Cell';

const WORD_LENGTH = 5;

type Props = {
    word: string,
}

const GridRow = ({ word = "" }: Props) => {
    const lettersRemaining = WORD_LENGTH - word.length;
    const letters = word.split("").concat(new Array(lettersRemaining).fill(""));
    const guessStates = compareGuess(randomWord, word);

    return (
        <div className="grid grid-cols-5">
            {letters.map((character, index) => (
                <Cell key={character + index} character={character} state={guessStates[index]} />
            ))}
        </div>
    )
}

export default GridRow