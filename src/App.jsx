import { useState, useEffect } from "react";

import Square from "./Components/Square";

import "./App.css";

const TURNS = {
    X: "x",
    O: "o",
};

const WINNER_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const initialBoard = Array(9).fill(null);

export default function App() {
    const [winner, setWinner] = useState(null);
    const [turn, setTurn] = useState(TURNS.X);
    const [board, setBoard] = useState(initialBoard);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        // update board
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        // change turn
        setTurn(turn == TURNS.X ? TURNS.O : TURNS.X);

        // check winner
        for (const comb_idx in WINNER_COMBINATIONS) {
            const [a, b, c] = WINNER_COMBINATIONS[comb_idx];
            if (
                newBoard[a] &&
                newBoard[a] === newBoard[b] &&
                newBoard[b] === newBoard[c]
            ) {
                setWinner(turn);
            }
        }

        // check full board
        if (newBoard.every((square) => square !== null)) {
            setWinner("draw");
        }
    };

    const handleReset = () => {
        setBoard(initialBoard);
        setTurn(TURNS.X);
        setWinner(null);
    };

    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            {winner && (
                <div className="reset-game">
                    {winner === "draw" ? (
                        <p>
                            <span>Hubo un empate</span>
                        </p>
                    ) : (
                        <p>
                            El ganador es <span>{winner}</span>
                        </p>
                    )}
                    <button onClick={handleReset}>Reiniciar</button>
                </div>
            )}
            <div className="board">
                {board.map((value, index) => (
                    <Square
                        key={index}
                        onClick={handleClick}
                        index={index}
                        value={value}
                    />
                ))}
            </div>
            <h2>Turns: </h2>
            <div className="turn-board">
                <Square value={TURNS.X} isActive={turn == TURNS.X} />
                <Square value={TURNS.O} isActive={turn == TURNS.O} />
            </div>
        </div>
    );
}
