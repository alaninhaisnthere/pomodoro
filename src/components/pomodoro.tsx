import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Countdown from "./countdown";
import { Pause, Play, RotateCcw } from "styled-icons/feather";

const Pomodoro = () => {
  const [activeTimer, setActiveTimer] = useState("focus");
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startSoundPlayed, setStartSoundPlayed] = useState(false);
  const [finishSoundPlayed, setFinishSoundPlayed] = useState(false);
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

  const startSoundRef = useRef<HTMLAudioElement>(null);
  const finishSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (startSoundRef.current) {
      startSoundRef.current.src = "/sounds/start.mp3";
      startSoundRef.current.load();
    }

    if (finishSoundRef.current) {
      finishSoundRef.current.src = "/sounds/finish.mp3";
      finishSoundRef.current.load();
    }

    if (clickSoundRef.current) {
      clickSoundRef.current.src = "/sounds/click.mp3";
      clickSoundRef.current.load();
    }
  }, []);

  useEffect(() => {
    if (isActive && minutes >= 0 && !isPaused) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (!finishSoundPlayed && finishSoundRef.current) {
              finishSoundRef.current.play();
              setFinishSoundPlayed(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      if (!startSoundPlayed && startSoundRef.current) {
        startSoundRef.current.play();
        setStartSoundPlayed(true);
      }
    } else {
      clearInterval(interval as NodeJS.Timeout);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, minutes, seconds, isPaused, startSoundPlayed, finishSoundPlayed]);

  const startTimer = (timerType: string, timerMinutes: number) => {
    setActiveTimer(timerType);
    setMinutes(timerMinutes);
    setSeconds(0);
    setIsActive(true);
    setIsPaused(false);
    setStartSoundPlayed(false);
    setFinishSoundPlayed(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }
    if (!startSoundPlayed && !isPaused && startSoundRef.current) {
      startSoundRef.current.play();
      setStartSoundPlayed(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setActiveTimer("focus");
    setMinutes(25);
    setSeconds(0);
    setStartSoundPlayed(false);
    setFinishSoundPlayed(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Pomodoro</title>
      </Head>
      <style>{`body { background-color: ${timerColors[activeTimer]}; }`}</style>
      <div className="text-center">
        <div className="text-white font-inter text-64 w-24 h-24 mx-auto flex items-center justify-center">
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
            <RotateCcw size={16} /> 
          </button>
          <button onClick={pauseTimer} className="bg-gray-500 text-white px-4 py-2 m-2">
            {isPaused ? <Play size={16} /> : <Pause size={16} />} {isPaused ? "Continue" : "Pause"}
          </button>
        </div>
      </div>
      <audio ref={startSoundRef} />
      <audio ref={finishSoundRef} />
      <audio ref={clickSoundRef} />
    </div>
  );
};

export default Pomodoro;