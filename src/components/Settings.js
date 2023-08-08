// src/components/Settings.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Settings = () => {
  const [player1Symbol, setPlayer1Symbol] = useState('X');
  const [player2Symbol, setPlayer2Symbol] = useState('O');
  const [boardSize, setBoardSize] = useState(3);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSaveSettings = () => {
    // Implement logic to save settings (You can use local storage, Redux, or an API to store settings)
    // For example, using local storage:
    localStorage.setItem('player1Symbol', player1Symbol);
    localStorage.setItem('player2Symbol', player2Symbol);
    localStorage.setItem('boardSize', boardSize);
    
    // After saving settings, navigate back to the main game page
    navigate('/', { state: { boardSize } });

  };

  return (
    <div className="settings" style={{ color: 'white' }}>
      <h2>Settings</h2>
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
            max="5" // Set the maximum board size you want to allow (maximum 6 for this example)
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
