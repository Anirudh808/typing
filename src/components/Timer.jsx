import React, { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <p className="flex items-center justify-center border-1 border-[#3295db] text-gray-700 text-3xl font-bold w-[10%] rounded-md shadow-lg">
      <span>⏱️</span> <span className="ml-2">{formatTime(timeLeft)}</span>
    </p>
  );
};

export default Timer;
