import React, { useEffect } from 'react';

const Timer = ({ timer, setTimer, handleSubmit }) => {
  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, setTimer, handleSubmit]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  return (
    <div className="text-right text-gray-600">
      Time Left: {formatTime()}
    </div>
  );
};

export default Timer;
