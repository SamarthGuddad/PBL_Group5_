import React, { useEffect, useState } from "react";
import './dashboard.css';

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const email = localStorage.getItem("email");



  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("http://localhost/kids_learning/get_progress.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        setProgressData(data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    if (email) {
      fetchProgress();
    }
  }, [email]);

  const getMaxProgress = (moduleName) => {
    switch (moduleName) {
      case "matching": return 11;
      case "counting": return 10;
      case "crossword": return 7;
      default: return 10;
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Your Learning Progress</h2>
      <div className="progress-grid">
        {progressData.map((item, index) => (
          <div className="progress-card animate-fadeIn" key={index}>
            <h3 className="module-title">{item.module_name.replace("_", " ").toUpperCase()}</h3>
            {["addition", "subtraction", "multiplication", "division"].includes(item.module_name) ? (
              <p className="progress-text">Problems Solved: {item.progress}</p>
            ) : (
              <>
                <p className="progress-text">Progress: {item.progress} / {getMaxProgress(item.module_name)}</p>
                <div className="custom-progress-bar">
                  <div
                    className="fill"
                    style={{
                      width: `${(item.progress / getMaxProgress(item.module_name)) * 100}%`
                    }}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
