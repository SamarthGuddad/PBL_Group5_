import React from 'react';
import { Link } from "react-router-dom";
import './games.css'; // Scoped styles

function Games() {
  return (
    <div className="games-body">
      <header className="games-header">
        <h1>📚 Mathematical Challenges</h1>
      </header>

      <div className="games-section">
        <div className="games-card">
          <h2>🔢 Count</h2>
          <p>Count the objects and learn numbers in a fun way!</p>
          <Link to="/count" className="games-button">Start Counting</Link>
        </div>

        <div className="games-card">
          <h2>➕➖✖️➗ Arithmetic</h2>
          <p>Solve addition, subtraction, multiplication, and division problems.</p>
          <Link to="/arithmatic" className="games-button">Start Arithmetic</Link>
        </div>
      </div>

      <footer className="games-footer">
        <p>&copy; 2025 KidLearn</p>
      </footer>
    </div>
  );
}

export default Games;
