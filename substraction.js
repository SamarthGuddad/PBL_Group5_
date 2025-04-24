import React, { useState, useEffect } from 'react';
import './subtraction.css';

import Wrong from './wrong.gif';
import Right from './right.gif';

const SubtractionGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🍏');
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
          module: "subtraction",
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

  const emojis = ['🍏', '🐱', '🌟', '🎂', '🛸'];

  useEffect(() => {
    generateQuestion();
  }, [selectedEmoji]);

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * n1) + 1;
    setNum1(n1);
    setNum2(n2);
    setAnswer('');
    setFeedback('');
    setShowCorrectGif(false);
    setShowWrongGif(false);
  };

  const checkAnswer = () => {
    const correctAnswer = num1 - num2;
    const userAnswer = parseInt(answer);
    const equation = `${num1} minus ${num2} is equal to ${correctAnswer}.`;

    if (userAnswer === correctAnswer) {
      setFeedback('✅ Correct! Great job!');
      setShowCorrectGif(true);
      setShowWrongGif(false);
      speakText(`${equation} Great job!`);
      const newProgress = progress + 1;
      setProgress(newProgress);
      updateProgressToServer(newProgress);

      setTimeout(() => {
        setShowCorrectGif(false);
        generateQuestion();
      }, 3000);
    } else {
      setFeedback('❌ Oops! Try again.');
      setShowWrongGif(true);
      setShowCorrectGif(false);
      speakText(`${equation} Oops! Try again.`);

      setTimeout(() => {
        setShowWrongGif(false);
      }, 3000);
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) => voice.name.includes('Female') || voice.name.includes('Google UK English Female')
    );
    speech.voice = femaleVoice || voices[0];
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => speakText('');
  }, []);

  return (
    <div className="subtraction-container">
      <div className="container">
        <h1>➖ Subtraction Fun! ➖</h1>

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

        <div className="question">
          What is {num1} - {num2}?
        </div>

        <div className="emoji-display">
          {selectedEmoji.repeat(num1)} - {selectedEmoji.repeat(num2)}
        </div>

        <input
          type="number"
          className="input-box"
          placeholder="?"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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
};

export default SubtractionGame;
