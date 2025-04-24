import React, { useState, useEffect } from 'react';
import './multiplication.css';

import Wrong from './wrong.gif';
import Right from './right.gif';

const emojis = ['🍎', '🐶', '⭐', '🎈', '🚀'];

function App() {
  const [num1, setNum1] = useState(3);
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
          module: "multiplication",
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
    const newNum1 = Math.floor(Math.random() * 9) + 1;
    const newNum2 = Math.floor(Math.random() * 9) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
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
    if (femaleVoice) {
      speech.voice = femaleVoice;
    } else {
      speech.voice = voices[0];
    }
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = () => {
    const correct = num1 * num2;
    const spokenText = `${num1} times ${num2} is equal to ${correct}.`;

    if (parseInt(userAnswer) === correct) {
      setFeedback("✅ Correct! You're a star!");
      setShowCorrectGif(true);
      setShowWrongGif(false);
      speakText(spokenText + " You're amazing!");
      const newProgress = progress + 1;
      setProgress(newProgress);
      updateProgressToServer(newProgress);

      // Generate a new question after a correct answer
      setTimeout(generateQuestion, 2000); // Delay 2 seconds before showing the next question
    } else {
      setFeedback('❌ Try again!');
      setShowWrongGif(true);
      setShowCorrectGif(false);
      speakText(spokenText + " Let's try again!");

      // Do not generate a new question for wrong answer, stay on the same question
    }
  };

  const renderEmojis = () => {
    const rows = [];
    for (let i = 0; i < num1; i++) {
      rows.push(
        <div key={i}>
          {selectedEmoji.repeat(num2)}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="multiplication-container">
      <div className="container">
        <h1>✖️ Multiplication Fun! ✖️</h1>

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

        <div className="question">{`What is ${num1} × ${num2}?`}</div>
        <div className="emoji-display">{renderEmojis()}</div>

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="input-box"
          placeholder="?"
        />
        <br />
        <button className="btn" onClick={checkAnswer}>
          Check Answer
        </button>
        <div className="feedback">{feedback}</div>

        {showCorrectGif && <img src={Right} alt="Correct" className="answer-gif" />}
        {showWrongGif && <img src={Wrong} alt="Wrong" className="answer-gif" />}
      </div>
    </div>
  );
}

export default App;
