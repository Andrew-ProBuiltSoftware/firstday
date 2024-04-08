import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  const dayOfTheWeek = new Date().getDay();
  const daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  } as const;
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);

  return (
    <>
      <h1 className="text-inter align-middle justify-center font-bold mb-4 mt-4 text-6xl text-nowrap font-sans">
        {currentTime}
        <div className="container flex justify-between text-base mt-2 p-2 font-bold mb-4">
          <h2>{daysOfTheWeek[dayOfTheWeek]}</h2>
          <h2>{formattedDate}</h2>
        </div>
      </h1>
    </>
  );
};

export default Clock;
