export default function Square({ index, value, isActive, onClick }) {
    const squareClass = isActive ? "active" : " ";

    return (
        <div
            className={"square" + " " + squareClass}
            key={index}
            onClick={() => onClick(index)}
        >
            <p>{value}</p>
        </div>
    );
}
