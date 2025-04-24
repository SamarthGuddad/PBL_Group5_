import React, { useState } from "react";
import "./count.css";
import Wrong from './wrong.gif';
import Right from './right.gif';

const emojis = ["🚗", "🐶", "📚", "⚽", "🎸", "🎈", "🚀", "🖍️", "🎩", "💎"];

const Count = () => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [droppedItems, setDroppedItems] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [showCorrect, setShowCorrect] = useState(false);
    const [showWrong, setShowWrong] = useState(false);

    const speakText = (text) => {
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    };

    const handleDrop = (emoji) => {
        if (droppedItems.length < currentNumber) {
            setDroppedItems([...droppedItems, emoji]);
        }
    };

    const allowDrop = (event) => event.preventDefault();

    const onDrop = (event) => {
        event.preventDefault();
        const emoji = event.dataTransfer.getData("text");
        handleDrop(emoji);
    };

    const checkAnswer = () => {
        if (droppedItems.length === currentNumber) {
            setFeedback("✅ Correct! Well done!");
            setShowCorrect(true);
            setShowWrong(false);
            speakText("Hurray! Great job, you got it correct!");
            updateProgress("counting", currentNumber);
        } else {
            setFeedback("❌ Wrong! Try again.");
            setShowCorrect(false);
            setShowWrong(true);
            speakText("Oops! Try again.");
        }
    };

    const resetBox = () => {
        setDroppedItems([]);
        setFeedback("");
        setShowCorrect(false);
        setShowWrong(false);
    };

    const nextNumber = () => {
        if (currentNumber < 10) {
            setCurrentNumber(currentNumber + 1);
            setDroppedItems([]);
            setFeedback("");
            setShowCorrect(false);
            setShowWrong(false);
            speakText(`The number is ${currentNumber + 1}`);
        }
    };

    const previousNumber = () => {
        if (currentNumber > 1) {
            setCurrentNumber(currentNumber - 1);
            setDroppedItems([]);
            setFeedback("");
            setShowCorrect(false);
            setShowWrong(false);
            speakText(`The number is ${currentNumber - 1}`);
        }
    };

    const handleDrag = (event) => {
        event.dataTransfer.setData("text", event.target.innerText);
    };

    const updateProgress = async (moduleName, newProgress) => {
        const email = localStorage.getItem("email");

        if (!email) {
            console.warn("Email missing from localStorage");
            return;
        }

        try {
            const res = await fetch("http://localhost/kids_learning/update_progress.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    module: moduleName,
                    progress: newProgress
                }),
            });

            const data = await res.json();
            console.log("Update response:", data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className="app">
            <h2 className="title">Drag Objects to Match the Number!</h2>

            {/* NumberBox */}
            <div
                className="number-box"
                onDragOver={allowDrop}
                onDrop={onDrop}
            >
                <span className="number">{currentNumber}</span>
                {droppedItems.map((item, index) => (
                    <span key={index} className="dropped-item">{item}</span>
                ))}
            </div>

            <h3>Drag these objects:</h3>

            {/* ObjectContainer */}
            <div className="objects-container">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="object"
                        draggable
                        onDragStart={handleDrag}
                    >
                        {emojis[currentNumber - 1]}
                    </div>
                ))}
            </div>

            <div className="buttons">
                <button onClick={previousNumber}>Previous</button>
                <button onClick={nextNumber}>Next</button>
                <button onClick={checkAnswer}>Check</button>
                <button onClick={resetBox}>Reset</button>
            </div>

            {/* Feedback */}
            <div className="feedback-container">
                <p className="feedback-message">{feedback}</p>
                {showCorrect && (
                    <img src={Right} alt="Correct" className="result-image" />
                )}
                {showWrong && (
                    <img src={Wrong} alt="Wrong" className="result-image" />
                )}
            </div>
        </div>
    );
};

export default Count;
