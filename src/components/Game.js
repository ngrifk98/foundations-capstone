// src/components/Game.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Game.css';

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#006400", 
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "308px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function calculateWinner(squares) {
  const boardSize = squares.length;
  const lines = [];

  for (let i = 0; i < boardSize; i++) {
    lines.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
  }

  for (let i = 0; i < boardSize; i++) {
    lines.push(Array.from({ length: boardSize }, (_, j) => i + boardSize * j));
  }

  lines.push(Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)));
  lines.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)));

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      squares[Math.floor(a / boardSize)][a % boardSize] &&
      squares[Math.floor(a / boardSize)][a % boardSize] === squares[Math.floor(b / boardSize)][b % boardSize] &&
      squares[Math.floor(a / boardSize)][a % boardSize] === squares[Math.floor(c / boardSize)][c % boardSize]
    ) {
      return squares[Math.floor(a / boardSize)][a % boardSize];
    }
  }
  return null;
}

const Square = React.memo(({ status, rowIndex, cellIndex, onSet }) => {
  console.log("rendered cell");
  return (
    <div
      className="square"
      style={squareStyle}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (status) e.preventDefault();
        else onSet(rowIndex, cellIndex);
      }}
    >
      {status}
    </div>
  );
});

const Board = ({ xIsNext, squares, onPlay }) => {
  function handleClick(rowIndex, cellIndex) {
    if (calculateWinner(squares) || squares[rowIndex][cellIndex]) {
      return;
    }
    const nextSquares = squares.map((row, rIndex) =>
      rIndex !== rowIndex ? row : row.map((cell, cIndex) => (cIndex !== cellIndex ? cell : xIsNext ? "X" : "O"))
    );

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;

    if (winner === "X" || winner === "O") {
      status = <span className="flash">Winner: {winner}</span>;
    }
  } else if (squares.flat().every(cell => cell !== null)) {
    status = "TIE!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return (
    <>
      <div className="status" style={instructionsStyle}>
        {status}
      </div>
      {winner && (
        <div className="winner" style={instructionsStyle}>
          
        </div>
      )}
      

      <button style={buttonStyle} onClick={() => onPlay(createInitialSquares(squares.length))}>
        Reset
      </button>
      <div style={boardStyle}>
        {squares.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row" style={rowStyle}>
            {row.map((cell, cellIndex) => (
              <Square
                key={cellIndex}
                status={cell}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                onSet={() => {
                  handleClick(rowIndex, cellIndex);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const createInitialSquares = (boardSize) => {
  const initialSquares = [];
  for (let i = 0; i < boardSize; i++) {
    initialSquares.push(Array(boardSize).fill(null));
  }
  return initialSquares;
};

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { boardSize } = location?.state || { boardSize: 3 };

  const [gameHistory, setHistory] = useState([createInitialSquares(boardSize)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showNameInput, setShowNameInput] = useState(false); 
  const [newHighScoreName, setNewHighScoreName] = useState(''); 
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = gameHistory[currentMove];

  useEffect(() => {
    setHistory([createInitialSquares(boardSize)]);
  }, [boardSize]);
  
  const handlePlay = (nextSquares) => {
    const nextHistory = [...gameHistory.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      // Trigger the score-saving process when a player wins
      setShowNameInput(true);
      setNewHighScoreName('');
    }
  };

  const handleSaveScore = () => {
    // Add logic to save the new high score with the entered name
    setShowNameInput(false);
    navigate('/high-scores');
  };

  const moves = gameHistory.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  
  return (
    <div style={containerStyle} className="gameBoard">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {showNameInput && (
        <div className="name-input-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={newHighScoreName}
            onChange={(e) => setNewHighScoreName(e.target.value)}
          />
          <button className="save-button" onClick={handleSaveScore}>
            Save
          </button>
        </div>
      )}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;