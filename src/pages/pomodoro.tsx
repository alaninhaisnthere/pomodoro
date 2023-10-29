import { useState, useEffect } from "react";

const Pomodoro = () => {
  const [activeTimer, setActiveTimer] = useState("focus");
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
    <div>
      <h1>Pomodoro</h1>
      <div>
        {activeTimer === "focus" && <p>focus time</p>}
        {activeTimer === "shortBreak" && <p>short break</p>}
        {activeTimer === "longBreak" && <p>long break</p>}
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div>
        <button onClick={() => startTimer("focus", 25)}>iniciar</button>
        <button onClick={() => startTimer("shortBreak", 5)}>short break</button>
        <button onClick={() => startTimer("longBreak", 15)}>long break</button>
        <button onClick={resetTimer}>resetar</button>
      </div>
    </div>
  );
};

export default Pomodoro;
