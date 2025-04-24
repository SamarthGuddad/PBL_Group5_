import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './arithmatic.css'; // Scoped styles

function Arithmetic() {
  return (
    <div className="arithmetic-body">
      <header className="arithmetic-header">
        <h1 className="arithmetic-title">🔢 Welcome to the Arithmetic World!</h1>
      </header>

      <main className="arithmetic-main">
        <ArithmeticCard title="Addition" desc="Practice your Adding operations!" link="/addition" emoji="➕" />
        <ArithmeticCard title="Subtraction" desc="Sharpen your Subtraction skills!" link="/substraction" emoji="➖" />
        <ArithmeticCard title="Multiplication" desc="Master your Multiplication moves!" link="/multiplication" emoji="✖️" />
        <ArithmeticCard title="Division" desc="Challenge yourself with Division!" link="/division" emoji="➗" />
      </main>

      <footer className="arithmetic-footer">
        <p>&copy; 2025 KidLearn | All Rights Reserved</p>
      </footer>
    </div>
  );
}

const ArithmeticCard = ({ title, desc, link, emoji }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="arithmetic-card">
      <h2>{emoji} {title}</h2>
      <p>{desc}</p>
      <Link
        to={link}
        className="arithmetic-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: hover ? '#28a745' : '#32cd32',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hover ? '0 6px 12px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        Start {title}
      </Link>
    </div>
  );
};

export default Arithmetic;
