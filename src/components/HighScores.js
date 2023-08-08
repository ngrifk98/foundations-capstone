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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-api-endpoint'); // Replace with your actual API endpoint
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

  return (
    <div className="high-scores">
      <h2 className="header-text">High Scores</h2>
      <div className="table-container"> {/* Add a container for center alignment */}
        <table className="high-scores-table">
          <thead>
            <tr>
              <th className="table-header">Player Name</th>
              <th className="table-header">Score</th>
            </tr>
          </thead>
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
      <button className="back-button" onClick={handleBackToMain}>Back to Main</button>
    </div>
  );
};

export default HighScores;
