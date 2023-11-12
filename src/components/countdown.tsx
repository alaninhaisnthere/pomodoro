import React from "react";

interface CountdownProps {
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ minutes, seconds }) => {
  const styleMinutes = { "--value": minutes } as React.CSSProperties;
  const styleSeconds = { "--value": seconds } as React.CSSProperties;

  return (
    <span className="countdown font-sans text-4xl">
      <span style={styleMinutes}></span>:
      <span style={styleSeconds}></span>
    </span>
  );
};

export default Countdown;