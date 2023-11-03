import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Countdown from "./countdown";

const Pomodoro = () => {
  const [activeTimer, setActiveTimer] = useState("focus");
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let interval: NodeJS.Timeout | undefined;

  const timerColors: Record<string, string> = {
    focus: "#BA4949",
    shortBreak: "#396366",
    longBreak: "#204E6F",
  };

  const getButtonStyle = (timerType: string) => {
    return {
      backgroundColor: timerColors[timerType],
      color: "white",
      padding: "4px 8px",
      margin: "2px",
      border: "none",
      cursor: "pointer",
    };
  };

  useEffect(() => {
    const backgroundColor = timerColors[activeTimer];
    document.body.style.backgroundColor = backgroundColor;
  }, [activeTimer]);

  useEffect(() => {
    if (isActive && minutes >= 0) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval as NodeJS.Timeout);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, minutes, seconds]);

  const startTimer = (timerType: string, timerMinutes: number) => {
    setActiveTimer(timerType);
    setMinutes(timerMinutes);
    setSeconds(0);
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setActiveTimer("focus");
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Pomodoro</title>
      </Head>
      <style>{`body { background-color: ${timerColors[activeTimer]}; }`}</style>
      <div className="text-center">
        <div className="text-white font-inter text-64 border-4 border-white rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <Countdown minutes={minutes} seconds={seconds} />
        </div>
        <div className="font-inter text-32 mt-4">
          {activeTimer === "focus" && <p>Focus Time</p>}
          {activeTimer === "shortBreak" && <p>Short Break</p>}
          {activeTimer === "longBreak" && <p>Long Break</p>}
        </div>
        <div className="mt-4">
          <button
            onClick={() => startTimer("focus", 25)}
            style={getButtonStyle("focus")}
          >
            Focus Time
          </button>
          <button
            onClick={() => startTimer("shortBreak", 5)}
            style={getButtonStyle("shortBreak")}
          >
            Short Break
          </button>
          <button
            onClick={() => startTimer("longBreak", 15)}
            style={getButtonStyle("longBreak")}
          >
            Long Break
          </button>
          <button onClick={resetTimer} className="bg-gray-500 text-white px-4 py-2 m-2">
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
