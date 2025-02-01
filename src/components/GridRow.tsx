import { letterStatus } from "../utils/utils";
import Cell from "./Cell";
import { WORD_LENGTH } from "../store/store.ts";

type Props = {
    word: string,
    result?: letterStatus[],
    animateRowCss: string
}

const GridRow = ({ word = "", result = [], animateRowCss = "" }: Props) => {

    const lettersRemaining = WORD_LENGTH - word.length;
    const letters = word.split("").concat(new Array(lettersRemaining).fill(""));

    return (
        <div className={`grid grid-cols-5 ${animateRowCss}`}>
            {letters.map((character, index) => (
                /* 
                // Result is optional and it gets loaded only after the user has made a guess
                // If the result is not loaded, the cell will be empty and so user will not get any feedback before making a guess
                */
                <Cell key={character + index} character={character} state={result[index]} />
            ))}
        </div>
    )
}

export default GridRow