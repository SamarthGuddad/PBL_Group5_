import React, { useState, useEffect } from "react";
import "./crossword.css";
import Wrong from './wrong.gif';
import Right from './right.gif';

const puzzles = [{
  clues: {
    across: {
      0: "0 : The Letter starting from 'E' (ANIMAL)",
      1: "1 : Starting with 'T' (we see _____ in Clock)",
      3: "3 : CAMEL has long _____ ."
    },
    down: {
      1: "1 : The word starts from 'L' (ANIMAL)",
      3: "3 : National bird of INDIA",
      7: "7 : National animal of India"
    }
  },
  answers: {
    "0-0": "E", "0-1": "L", "0-2": "E", "0-3": "P", "0-4": "H", "0-5": "A", "0-6": "N", "0-7": "T",
    "1-1": "I", "2-1": "O", "3-1": "N",
    "1-0": "T", "1-2": "M",
    "3-2": "E", "3-4": "K",
    "1-3": "E", "2-3": "A", "3-3": "C", "4-3": "O", "5-3": "C", "6-3": "K",
    "1-7": "I", "2-7": "G", "3-7": "E", "4-7": "R"
  }
},
{
  clues: {
    across: {
      0: "0 : I come after April(month)",
      1: "1 : National animal of INDIA (ANIMAL).",
      3: "3 : Today's ______ is 26 March 2025",
      5:"5 : I Come after February(Month)"
    },
    down: {
      1: "1 : OUR country Names.",
      3: "3 : I eat Mouse (animal)"
    }
  },
  answers: {
    "1-0": "T", "1-1": "I", "1-2": "G", "1-3": "E", "1-4": "R",
    "2-1": "N","3-1": "D","4-1": "I","5-1": "A",
    "3-2": "A","3-3": "T","3-4": "E",
    "5-0": "M","5-2": "R","5-3": "C","5-4": "H",
    "6-0": "A","7-0": "Y",
    "6-3": "A","7-3": "T",
  }
},
{
  "clues": {
      "across": {
          "0": "0 : The color of the sky on a clear day.",
          "2": "2 : A fruit that is red and round.",
          "3": "3 : Opposite of 'hot'.",
          "4": "4 : King rule on _______"
      },
      "down": {
        "0": "0 : Opposite of White(Color)",
        "7": "7 : Last mounth(12 th)"
          
      }
  },
  "answers": {
      "0-0": "B", "0-1": "L", "0-2": "U", "0-3": "E",
      "2-0": "A", "2-1": "P", "2-2": "P", "2-3": "L", "2-4": "E",
      "3-0": "C", "3-1": "O", "3-2": "L", "3-3": "D",
      "1-0": "L","4-0": "K",
      "0-7": "D","1-7": "E","2-7": "C","3-7": "E","4-7": "M","5-7": "B","6-7": "E","7-7": "R",
      "4-1": "I","4-2": "N","4-3": "G","4-4": "D","4-5": "O","4-6": "M",
  }
},

{
  "clues": {
      "across": {
          "0": "0 : The capital of France.",
          "1": "1 : The largest planet in our solar system.",
          "4": "4 : The opposite of 'small'."
      },
      "down": {
        "4": "4 : I Live in Sky",

          
      }
  },
  "answers": {
      "0-0": "P", "0-1": "A", "0-2": "R", "0-3": "I", "0-4": "S",
      "1-0": "J", "1-1": "U", "1-2": "P", "1-3": "I", "1-4": "T", "1-5": "E", "1-6": "R",
      "4-0": "B", "4-1": "I", "4-2": "G",
      "2-4": "A", "3-4": "R",
  }
},


{
  "clues": {
      "across": {
          "0": "0 : A yellow fruit that monkeys love.",
          "1":"1 : I am National Bird of India",
          "3": "3 : I am KING of Jungle",
          
      },  
      "down": {
        "1":"1 :Fruit stating Letter is 'A'."
          
      }
  },
  "answers": {
      "0-0": "B", "0-1": "A", "0-2": "N", "0-3": "A", "0-4": "N", "0-5": "A",
      "1-1": "P","2-1": "P","3-1": "L","4-1": "E",
      "1-2": "E","1-3": "A","1-4": "C","1-5": "O","1-6": "C","1-7": "K",
      "3-2": "I","3-3": "O","3-4": "N",
  }
},


{
  "clues": {
      "across": {
          "1":"1:I am Ancistor of Human's ",
          "4":"4:I am Name of Color As well as Name of Fruit",
          
      },  
      "down": {
        "1":"1 :Fruit stating Letter is 'M'(King of Fruit).",
          
      }
  },
  "answers": {
      "0-1": "M", "1-1": "A","2-1": "N","3-1": "G","4-1": "O",
      "0-2": "O","0-3": "N","0-4": "K","0-5": "E","0-6": "Y",
      "4-2": "R","4-3": "A","4-4": "N","4-5": "G","4-6": "E",
      
  }
},
];

const Crossword = (props) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [grid, setGrid] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [showCorrectImage, setShowCorrectImage] = useState(false);
  const [showWrongImage, setShowWrongImage] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    renderPuzzle();
    setCompleted(false);
    setShowCorrectImage(false);
    setShowWrongImage(false);
  }, [currentPuzzleIndex]);

  const renderPuzzle = () => {
    const puzzle = puzzles[currentPuzzleIndex];
    const newGrid = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        newGrid.push({
          position: `${row}-${col}`,
          value: "",
          correctAnswer: puzzle.answers[`${row}-${col}`] || "",
          status: ""
        });
      }
    }
    setGrid(newGrid);
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

  const handleChange = (index, event) => {
    const newGrid = [...grid];
    const value = event.target.value.slice(0, 1).toUpperCase();
    newGrid[index].value = value;
    newGrid[index].status = "";
    setGrid(newGrid);
  };

  const updateProgress = async () => {
    try {
      await fetch("http://localhost/kids_learning/update_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, module: "crossword", progress: currentPuzzleIndex + 1 })
      });
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const newGrid = grid.map((cell) => {
      if (cell.correctAnswer && cell.value === cell.correctAnswer) {
        correctCount++;
        return { ...cell, status: "correct" };
      }
      return { ...cell, status: cell.value ? "incorrect" : "" };
    });

    const totalAnswers = Object.keys(puzzles[currentPuzzleIndex].answers).length;
    const isCompleted = correctCount === totalAnswers;

    setGrid(newGrid);
    setCompleted(isCompleted);

    if (isCompleted) {
      speakText("🎉 Great job! All answers are correct!");
      document.getElementById("success-audio").play();
      setShowCorrectImage(true);
      setShowWrongImage(false);
      updateProgress(); // ✅ Record progress
    } else {
      speakText(`You got ${correctCount} out of ${totalAnswers} correct. Try again.`);
      setShowWrongImage(true);
      setShowCorrectImage(false);
    }
  };

  const nextQuestion = () => {
    setCurrentPuzzleIndex((prevIndex) => (prevIndex + 1) % puzzles.length);
  };

  return (
    <div className="crossword-container" style={props.mystyle}>
      <h1 style={props.mystyle}>Crossword Puzzle</h1>
      <h3 style={props.mystyle}>Level {currentPuzzleIndex + 1}</h3>

      <div className="grid">
        {grid.map((cell, index) => (
          <input
            key={cell.position}
            type="text"
            maxLength="1"
            className={`cell ${cell.status || ""} ${!cell.correctAnswer ? "disabled" : ""}`}
            value={cell.value}
            onChange={(e) => handleChange(index, e)}
            disabled={!cell.correctAnswer}
          />
        ))}
      </div>

      <button onClick={checkAnswers}>Check Answers</button>
      <button onClick={nextQuestion}>Next (Level {currentPuzzleIndex + 2})</button>

      {completed && <p id="message">🎉 Great job! All answers are correct!</p>}
      {showCorrectImage && <img src={Right} alt="Correct!" className="feedback-gif" />}
      {showWrongImage && <img src={Wrong} alt="Try Again!" className="feedback-gif" />}

      <div className="clues" style={props.mystyle}>
        <h3 style={props.mystyle}>Clues:</h3>
        <p>
          <strong>Across:</strong> {Object.values(puzzles[currentPuzzleIndex].clues.across).map((clue, index) => (
            <span key={index}>{clue}<br /></span>
          ))}
        </p>
        <p>
          <strong>Down:</strong> {Object.values(puzzles[currentPuzzleIndex].clues.down).map((clue, index) => (
            <span key={index}>{clue}<br /></span>
          ))}
        </p>
      </div>

      <audio id="success-audio" src="/success.mp3" preload="auto"></audio>
    </div>
  );
};

export default Crossword;
