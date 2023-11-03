import { useState, useEffect } from "react";
import Head from "next/head";

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
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="font-inter text-32 mt-4">
          {activeTimer === "focus" && <p>Focus Time</p>}
          {activeTimer === "shortBreak" && <p>Short Break</p>}
          {activeTimer === "longBreak" && <p>Long Break</p>}
        </div>
        <div className="mt-4">
          <button
            onClick={() => startTimer("focus", 25)}
            className="bg-red-500 text-white px-4 py-2 m-2"
          >
            Focus Time
          </button>
          <button
            onClick={() => startTimer("shortBreak", 5)}
            className="bg-green-500 text-white px-4 py-2 m-2"
          >
            Short Break
          </button>
          <button
            onClick={() => startTimer("longBreak", 15)}
            className="bg-blue-500 text-white px-4 py-2 m-2"
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