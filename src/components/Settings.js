import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Symbol, setPlayer1Symbol] = useState('X');
  const [player2Symbol, setPlayer2Symbol] = useState('O');
  const [boardSize, setBoardSize] = useState(3);

  const navigate = useNavigate();

  const handleSaveSettings = () => {
    // Implement logic to save settings
    localStorage.setItem('player1Name', player1Name); // Save Player 1 name
    localStorage.setItem('player2Name', player2Name); // Save Player 2 name
    localStorage.setItem('player1Symbol', player1Symbol);
    localStorage.setItem('player2Symbol', player2Symbol);
    localStorage.setItem('boardSize', boardSize);
    
    navigate('/', { state: { boardSize } });
  };

  return (
    <div className="settings" style={{ color: 'white' }}>
      <h2>Settings</h2>
      <div>
        <label>
          Player 1 Name:
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Player 2 Name:
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Player 1 Symbol:
          <input
            type="text"
            value={player1Symbol}
            onChange={(e) => setPlayer1Symbol(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Player 2 Symbol:
          <input
            type="text"
            value={player2Symbol}
            onChange={(e) => setPlayer2Symbol(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Board Size:
          <input
            type="number"
            min="3"
            max="5"
            value={boardSize}
            onChange={(e) => setBoardSize(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button className="save-button" onClick={handleSaveSettings}>
        Save
      </button>
    </div>
  );
};

export default Settings;
