// src/components/Board.js
import React from 'react';
import Tile from './Tile';

const Board = ({ board, onTileClick }) => {
  const renderTile = (row, col) => {
    const index = row * 3 + col;
    return <Tile key={index} value={board[index]} onDrop={() => onTileClick(index)} />;
  };

  return (
    <div className="board">
      {Array.from({ length: 3 }).map((_, row) => (
        <div className="row" key={row}>
          {Array.from({ length: 3 }).map((_, col) => renderTile(row, col))}
        </div>
      ))}
    </div>
  );
};

export default Board;
