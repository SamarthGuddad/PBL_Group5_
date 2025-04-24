import React from 'react';
import { Link } from "react-router-dom";
import './fun.css'; // Scoped styles

function Fun() {
  return (
    <div className="fun-body">
      <header className="fun-header">
        <h1>🎉 Fun Games for Kids</h1>
      </header>

      <div className="fun-section">
        <div className="fun-card">
          <h2>🔤 Matching Game</h2>
          <p>Match capital letters to small letters!</p>
          <Link to="/matching" className="fun-button">Play Matching</Link>
        </div>

        <div className="fun-card">
          <h2>🧩 Crossword Puzzle</h2>
          <p>Solve fun and educational crossword puzzles!</p>
          <Link to="/crossword" className="fun-button">Play Crossword</Link>
        </div>
      </div>
    </div>
  );
}

export default Fun;
