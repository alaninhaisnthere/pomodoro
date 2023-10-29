import { useState, useEffect } from "react";

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    let interval: NodeJS.Timeout | undefined;
  
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

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
