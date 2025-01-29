import { letterStatus } from "../utils/utils"

type Props = {
    character: string,
    state: letterStatus,
}

const caracterStateStyle = {
    correct: "bg-green-500 text-white border-green-500",
    present: "bg-yellow-500 text-white border-yellow-500",
    absent: "bg-slate-400 text-white border-slate-400",
}


const Cell = ({character, state}: Props) => {
    console.log(state);
    
    const stateStyles = state ? caracterStateStyle[state] : "bg-white border-slate-200"
    return (
        <input
            value={character}
            readOnly
            data-testid="textbox"
            className={`border border-gray-300 p-2 text-center h-16 w-16 mt-4 rounded font-bold text-lg ${stateStyles}`}
        />)
}

export default Cell