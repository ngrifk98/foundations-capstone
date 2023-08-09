// src/components/HighScores.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HighScores.css';

const HighScores = () => {
  const [highScores, setHighScores] = useState([
    { name: 'ABC', score: 700 },
    { name: 'Clive', score: 600 },
    { name: 'Andy', score: 500 },
    { name: 'Marcus', score: 450 },
    { name: 'Rachel', score: 350 },
  ]);
  const [showNameInput, setShowNameInput] = useState(false); 
  const [newHighScoreName, setNewHighScoreName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-api-endpoint'); 
        const data = await response.json();
        const sortedScores = data.sort((a, b) => b.score - a.score);
        setHighScores(sortedScores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };

    fetchData();
  }, []);

  const handleBackToMain = () => {
    navigate('/');
  };

  const handleSaveScore = () => {
    if (newHighScoreName.trim() !== '') {
      
      const newScore = { name: newHighScoreName, score: 1000 }; 

      const updatedHighScores = [...highScores, newScore].sort((a, b) => b.score - a.score);
      setHighScores(updatedHighScores);

      setShowNameInput(false);
    }
  };

  return (
    <div className="high-scores">
      <h2 className="header-text">High Scores</h2>
      <div className="table-container">
        <table className="high-scores-table">
          {/* Table headers */}
          <thead>
            <tr>
              <th className="table-header">Player Name</th>
              <th className="table-header">Score</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {highScores.map((score, index) => (
              <tr key={index}>
                <td className="table-data">{score.name}</td>
                <td className="table-data">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Display name input when a new high score is achieved */}
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
      {/* Display back button */}
      <button className="back-button" onClick={handleBackToMain}>
        Back to Main
      </button>
    </div>
  );
};

export default HighScores;
