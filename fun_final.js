import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./fun.css"; 


export default function Fun({ mystyle }) {
  return (
    <div className="app-container" style={mystyle}>
      <header style={mystyle}>
        <h1 style={mystyle}>Fun Games</h1>
      </header>
      <div className="container" style={mystyle}>
        <h2 style={mystyle}>Explore The Fun Games</h2>
        <table className="game-table" style={mystyle}>
          <tbody>
            <tr>
              <td className="game-cell" style={mystyle}>
                <h3 style={mystyle}>Matching</h3>
                <p style={mystyle}>Match Capital letter to small letter!</p>
                <Link to="/matching">Play Now</Link>
              </td>

              <td className="game-cell" style={mystyle}>
                <h3 style={mystyle}>Crossword Puzzle</h3>
                <p style={mystyle}>Match the cards in the shortest time possible!</p>
                <Link to="/crossword">Play Now</Link>
              </td>

              <td className="game-cell" style={mystyle}>
                <h3 style={mystyle}>COUNTING</h3>
                <p style={mystyle}>Improve your memory with this fun game!</p>
                <Link to="/count">Play Now</Link>
              </td>
            </tr>

            <tr>
              <td className="game-cell" style={mystyle}>
                <h3 style={mystyle}>Addition</h3>
                <p style={mystyle}>Match Capital letter to small letter!</p>
                <Link to="/addition">Play Now</Link>
              </td>

              {/* <td className="game-cell" style={mystyle}>
                <h3 style={mystyle}>Crossword Puzzle</h3>
                <p style={mystyle}>Match the cards in the shortest time possible!</p>
                <Link to="/crossword">Play Now</Link>
              </td>

              <td className="game-cell" style={mystyle}>
                <h3 style={mystyle}>Matching_3</h3>
                <p style={mystyle}>Improve your memory with this fun game!</p>
                <Link to="/count">Play Now</Link> 
              </td> */}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
