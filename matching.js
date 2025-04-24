import React, { useState, useEffect } from "react";
import './matching.css';

import Wrong from './wrong.gif';
import Right from './right.gif';

const correctImage = Right;
const wrongImage = Wrong;

const gameSets = [ {
  capitalLetters: [
    { id: "A", letter: "A" },
    { id: "B", letter: "B" },
    { id: "C", letter: "C" },
    { id: "D", letter: "D" },
    { id: "E", letter: "E" },
    { id: "F", letter: "F" },
  ],
  smallLetters: [
    { id: "a", letter: "a" },
    { id: "b", letter: "b" },
    { id: "c", letter: "c" },
    { id: "d", letter: "d" },
    { id: "e", letter: "e" },
    { id: "f", letter: "f" },
  ],
},

{
  capitalLetters: [
    { id: "P", letter: "P" },
    { id: "B", letter: "B" },
    { id: "C", letter: "C" },
    { id: "O", letter: "O" },
    { id: "E", letter: "E" },
    { id: "R", letter: "R" },
  ],
  smallLetters: [
    { id: "b", letter: "b" },
    { id: "p", letter: "p" },
    { id: "c", letter: "c" },
    { id: "r", letter: "r" },
    { id: "e", letter: "e" },
    { id: "o", letter: "o" },
  ],
},

{
  capitalLetters: [
    { id: "A", letter: "A" },
    { id: "V", letter: "V" },
    { id: "W", letter: "W" },
    { id: "M", letter: "M" },
    { id: "R", letter: "R" },
    { id: "K", letter: "K" },
  ],
  smallLetters: [
    { id: "k", letter: "k" },
    { id: "w", letter: "w" },
    { id: "a", letter: "a" },
    { id: "r", letter: "r" },
    { id: "v", letter: "v" },
    { id: "m", letter: "m" },
  ],
},

{
  capitalLetters: [
    { id: "H", letter: "H" },
    { id: "S", letter: "S" },
    { id: "Q", letter: "Q" },
    { id: "O", letter: "O" },
    { id: "U", letter: "U" },
    { id: "T", letter: "T" },
  ],
  smallLetters: [
    { id: "t", letter: "t" },
    { id: "o", letter: "o" },
    { id: "u", letter: "u" },
    { id: "s", letter: "s" },
    { id: "h", letter: "h" },
    { id: "q", letter: "q" },
  ],
},

{
  capitalLetters: [
    { id: "I", letter: "I" },
    { id: "F", letter: "F" },
    { id: "J", letter: "J" },
    { id: "X", letter: "X" },
    { id: "G", letter: "G" },
    { id: "L", letter: "L" },
  ],
  smallLetters: [
    { id: "l", letter: "l" },
    { id: "j", letter: "j" },
    { id: "f", letter: "f" },
    { id: "g", letter: "g" },
    { id: "i", letter: "i" },
    { id: "x", letter: "x" },
  ],
},

{
  capitalLetters: [
    { id: "T", letter: "T" },
    { id: "U", letter: "U" },
    { id: "S", letter: "S" },
    { id: "H", letter: "H" },
    { id: "A", letter: "A" },
    { id: "R", letter: "R" },
  ],
  smallLetters: [
    { id: "h", letter: "h" },
    { id: "a", letter: "a" },
    { id: "t", letter: "t" },
    { id: "u", letter: "u" },
    { id: "s", letter: "s" },
    { id: "r", letter: "r" },
  ],
},

{
  capitalLetters: [
    { id: "R", letter: "R" },
    { id: "A", letter: "A" },
    { id: "M", letter: "M" },
    { id: "P", letter: "P" },
    { id: "U", letter: "U" },
    { id: "K", letter: "K" },
  ],
  smallLetters: [
    { id: "p", letter: "p" },
    { id: "u", letter: "u" },
    { id: "k", letter: "k" },
    { id: "r", letter: "r" },
    { id: "a", letter: "a" },
    { id: "m", letter: "m" },
  ],
},

{
  capitalLetters: [
    { id: "A", letter: "A" },
    { id: "B", letter: "B" },
    { id: "C", letter: "C" },
    { id: "D", letter: "D" },
    { id: "E", letter: "E" },
    { id: "F", letter: "F" },
  ],
  smallLetters: [
    { id: "a", letter: "a" },
    { id: "b", letter: "b" },
    { id: "c", letter: "c" },
    { id: "d", letter: "d" },
    { id: "e", letter: "e" },
    { id: "f", letter: "f" },
  ],
},

{
  capitalLetters: [
    { id: "E", letter: "E" },
    { id: "P", letter: "P" },
    { id: "O", letter: "O" },
    { id: "U", letter: "U" },
    { id: "L", letter: "L" },
    { id: "G", letter: "G" },
  ],
  smallLetters: [
    { id: "g", letter: "g" },
    { id: "l", letter: "l" },
    { id: "u", letter: "u" },
    { id: "e", letter: "e" },
    { id: "o", letter: "o" },
    { id: "p", letter: "p" },
  ],
},

{
  capitalLetters: [
    { id: "G", letter: "G" },
    { id: "L", letter: "L" },
    { id: "U", letter: "U" },
    { id: "T", letter: "T" },
    { id: "E", letter: "E" },
    { id: "W", letter: "W" },
  ],
  smallLetters: [
    { id: "g", letter: "g" },
    { id: "e", letter: "e" },
    { id: "w", letter: "w" },
    { id: "t", letter: "t" },
    { id: "l", letter: "l" },
    { id: "u", letter: "u" },
  ],
},];

export default function Matching(props) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [droppedLetters, setDroppedLetters] = useState({});
  const [resultMessage, setResultMessage] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const email = localStorage.getItem("email");

  useEffect(() => {
    setDroppedLetters({});
    setResultMessage("");
    setResultImage(null);
  }, [currentSetIndex]);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleDragStart = (event, letter) => {
    event.dataTransfer.setData("text", letter);
  };

  const handleDrop = (event, id) => {
    event.preventDefault();
    const letter = event.dataTransfer.getData("text");
    setDroppedLetters((prev) => ({ ...prev, [id]: letter }));

    let speech = new SpeechSynthesisUtterance(letter);
    window.speechSynthesis.speak(speech);
  };

  const updateProgress = async () => {
    try {
      const res = await fetch("http://localhost/kids_learning/update_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          module: "matching",
          progress: currentSetIndex + 1 // progress out of 11
        }),
      });
      const result = await res.json();
      console.log("Progress update:", result);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const currentSet = gameSets[currentSetIndex];

    currentSet.smallLetters.forEach(({ id }) => {
      const droppedLetter = droppedLetters[id];
      if (droppedLetter && droppedLetter.toLowerCase() === id) {
        correctCount++;
      }
    });

    if (correctCount === currentSet.smallLetters.length) {
      const message = "🎉 Great job! All matches are correct!";
      speakText(message);
      setResultMessage(message);
      setResultImage(correctImage);
      updateProgress(); // ✅ Track progress here
    } else {
      const message = `You got ${correctCount} out of ${currentSet.smallLetters.length} correct. Try again!`;
      speakText(message);
      setResultMessage(message);
      setResultImage(wrongImage);
    }
  };

  const nextQuestion = () => {
    if (currentSetIndex < gameSets.length - 1) {
      setCurrentSetIndex((prevIndex) => prevIndex + 1);
    } else {
      speakText("No more levels!");
      setResultMessage("🎉 You've completed all levels!");
      setResultImage(correctImage);
    }
  };

  const currentSet = gameSets[currentSetIndex];

  return (
    <div className="container text-center" style={props.mystyle}>
      <h1>Match Capital Letters to Small Letters</h1>
      <h2>Level {currentSetIndex + 1}</h2>

      <div className="d-flex justify-content-center mt-4">
        <div className="me-4">
          <h3 style={props.mystyle}>Capital Letters</h3>
          {currentSet.capitalLetters.map(({ id, letter }) => (
            <div
              key={id}
              id={id}
              className="p-3 border m-2 bg-primary text-white"
              draggable="true"
              onDragStart={(event) => handleDragStart(event, letter)}
            >
              {letter}
            </div>
          ))}
        </div>

        <div>
          <h3 style={props.mystyle}>Small Letters</h3>
          {currentSet.smallLetters.map(({ id, letter }) => (
            <div
              key={id}
              id={id}
              className="p-3 border m-2 drop-zone"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, id)}
              style={{
                color: 'black',
                backgroundColor:
                  droppedLetters[id] === letter.toUpperCase()
                    ? "green"
                    : droppedLetters[id]
                    ? "red"
                    : "white",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-success mt-3 me-2" onClick={checkAnswers}>
        Check Answers
      </button>
      <button className="btn btn-primary mt-3" onClick={nextQuestion}>
        NEXT (Level {currentSetIndex + 2})
      </button>

      {resultMessage && (
        <div className="mt-4">
          <h3>{resultMessage}</h3>
          {resultImage && <img src={resultImage} alt="result" width="150" />}
        </div>
      )}
    </div>
  );
}
