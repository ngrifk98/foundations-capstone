// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Game from './components/Game';
import HighScores from './components/HighScores';
import Settings from './components/Settings';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="game-header">Nick's Tac Toe Madness</h1>
        </header>

        <nav>
          <ul>
            <li>
              <Link to="/">Play Game</Link>
            </li>
            <li>
              <Link to="/high-scores">High Scores</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/high-scores" element={<HighScores />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
