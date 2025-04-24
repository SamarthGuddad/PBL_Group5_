import React, { useEffect, useState } from 'react';
import './addition.css';

import Wrong from './wrong.gif';
import Right from './right.gif';

const emojiOptions = ['🍎', '🐶', '⭐', '🎈', '🚀'];

function Addition() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState('🍎');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgressToServer = async (newProgress) => {
    const email = localStorage.getItem("email");

    try {
      const response = await fetch("http://localhost/kids_learning/update_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          module: "addition",
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

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 9) + 1;
    const newNum2 = Math.floor(Math.random() * 9) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setAnswer('');
    setFeedback('');
    setShowCorrect(false);
    setShowWrong(false);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    generateQuestion();
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes('Female') ||
        voice.name.includes('Google UK English Female')
    );
    speech.voice = femaleVoice || voices[0];
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 + num2;
    const message = `${num1} plus ${num2} is equal to ${correctAnswer}.`;

    if (userAnswer === correctAnswer) {
      setFeedback('✅ Correct! Great job!');
      setShowCorrect(true);
      setShowWrong(false);
      speakText(message + ' Great job!');
      const newProgress = progress + 1;
      setProgress(newProgress);
      updateProgressToServer(newProgress);

      // Hide the GIF after a few seconds and generate the next question
      setTimeout(() => {
        setShowCorrect(false);
        generateQuestion(); // Automatically generate next question
      }, 3000); // 3 seconds delay for GIF before moving to the next question

    } else {
      setFeedback('❌ Oops! Try again.');
      setShowWrong(true);
      setShowCorrect(false);
      speakText(message + ' Oops! Try again.');

      // Stay on the same question after wrong answer
      setTimeout(() => {
        setShowWrong(false); // Hide the wrong GIF after a moment
      }, 3000); // 3 seconds delay to allow the user to see the GIF
    }
  };

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => speakText('');
    generateQuestion();
  }, []);

  return (
    <div className="addition-container">
      <div className="container">
        <h1>➕ Addition Fun! ➕</h1>

        <div className="emoji-selection">
          <span>Select your emoji: </span>
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              className="emoji-button"
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="question">
          What is {num1} + {num2}?
        </div>
        <div className="emoji-display">
          {selectedEmoji.repeat(num1)} + {selectedEmoji.repeat(num2)}
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

        {showCorrect && (
          <img src={Right} alt="Correct!" className="answer-gif" />
        )}
        {showWrong && (
          <img src={Wrong} alt="Wrong!" className="answer-gif" />
        )}

        <img src="additionemoji.gif" className="bottom-gif left-gif" alt="" />
        <img src="additionemoji.gif" className="bottom-gif right-gif" alt="" />
      </div>
    </div>
  );
}

export default Addition;
