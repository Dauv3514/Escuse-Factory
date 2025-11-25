import './App.css';
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

export default function App() {
  const DURATION = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState<"rules" | "timer">("timer");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    if (timeLeft === 0) {
      setIsFinished(true);
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(DURATION);
    setIsFinished(false);
    setIsRunning(false);
  };

  const format = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = ((DURATION - timeLeft) / DURATION) * circumference;

  return (
    <div className="app-container">
      <Navbar current={currentPage} onNavigate={setCurrentPage} />

      <div className="timer-container">
        {currentPage === "rules" ? (
          <div style={{ color: "#E8DCC4" }}>
            <h2>Rules</h2>
            <p>Voici les règles de ton Timer...</p>
          </div>
        ) : (
          <>
            <h1 style={{ color: "#E8DCC4", fontSize: "2rem", marginBottom: "1rem" }}>
              Excuse Factory
            </h1>

            <p style={{ color: "#E8DCC4", fontSize: "1.2rem", marginBottom: "1rem" }}>
              {format(timeLeft)}
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
              <svg width="200" height="200">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#E8DCC4"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#2A6F9E"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="28"
                  fill="#E8DCC4"
                >
                  {format(timeLeft)}
                </text>
              </svg>
            </div>

            <div className="timer-buttons">
              <button onClick={reset} className="timer-button">✕</button>
              <button
                onClick={() => { if (!isFinished) setIsRunning(s => !s); }}
                className="timer-button play"
              >
                {isRunning ? "⏸" : "▶"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
