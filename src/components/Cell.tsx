
type Props = {
    character: string,
}

const Cell = ({character}: Props) => {
    return (
        <input
            value={character}
            readOnly
            data-testid="textbox"
            className="border border-gray-300 p-2 text-center h-16 w-16 mt-4 rounded font-bold text-lg"
        />)
}

export default Cell