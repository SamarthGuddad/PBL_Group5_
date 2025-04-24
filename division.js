import React, { useState, useEffect } from 'react';
import './division.css';

import Wrong from './wrong.gif';
import Right from './right.gif';

const emojis = ['🍎', '🐶', '⭐', '🎈', '🚀'];

function App() {
  const [num1, setNum1] = useState(6);
  const [num2, setNum2] = useState(2);
  const [selectedEmoji, setSelectedEmoji] = useState('🍎');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCorrectGif, setShowCorrectGif] = useState(false);
  const [showWrongGif, setShowWrongGif] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgressToServer = async (newProgress) => {
    const email = localStorage.getItem("email");

    try {
      const response = await fetch("http://localhost/kids_learning/update_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          module: "division",
          progress: newProgress
        }),
      });

      const result = await response.json();
      if (result.status !== "success") {
        console.error("Progress update failed:", result.message);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [selectedEmoji]);

  const generateQuestion = () => {
    const divisor = Math.floor(Math.random() * 8) + 2;
    const quotient = Math.floor(Math.random() * 8) + 1;
    const dividend = divisor * quotient;

    setNum1(dividend);
    setNum2(divisor);
    setUserAnswer('');
    setFeedback('');
    setShowCorrectGif(false);
    setShowWrongGif(false);
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes('Female') || voice.name.includes('Google UK English Female')
    );
    speech.voice = femaleVoice || voices[0];
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = () => {
    const correct = num1 / num2;
    const spoken = `${num1} divided by ${num2} is equal to ${correct}.`;

    if (parseInt(userAnswer) === correct) {
      setFeedback('✅ Correct! Great job!');
      setShowCorrectGif(true);
      setShowWrongGif(false);
      speakText(spoken + " You're doing great!");
      const newProgress = progress + 1;
      setProgress(newProgress);
      updateProgressToServer(newProgress);
      // Redirect to next question after a short delay
      setTimeout(() => {
        generateQuestion();
      }, 2000); // 2 seconds delay before next question
    } else {
      setFeedback('❌ Oops! Try again.');
      setShowWrongGif(true);
      setShowCorrectGif(false);
      speakText(spoken + " Give it another go!");
      // Stay on the same question
    }
  };

  return (
    <div className="division-container">
      <div className="container">
        <h1>➗ Division Fun! ➗</h1>

        <div className="emoji-selection">
          <span>Select your emoji: </span>
          {emojis.map((emoji) => (
            <button
              key={emoji}
              className="emoji-button"
              onClick={() => setSelectedEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="question">{`What is ${num1} ÷ ${num2}?`}</div>
        <div className="emoji-display">
          {selectedEmoji.repeat(num1)} ➗ {num2}
        </div>

        <input
          type="number"
          className="input-box"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="?"
        />
        <br />
        <button className="btn" onClick={checkAnswer}>
          Check Answer
        </button>
        <div className="feedback">{feedback}</div>

        {/* Displaying the GIFs without blocking the UI */}
        {showCorrectGif && <img src={Right} alt="Correct" className="answer-gif correct" />}
        {showWrongGif && <img src={Wrong} alt="Wrong" className="answer-gif wrong" />}
      </div>
    </div>
  );
}

export default App;
