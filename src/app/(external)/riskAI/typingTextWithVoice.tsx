import { Button } from '@/components/ui';
import React, { useState, useEffect } from 'react';

const TypingTextWithVoice = ({
  text,
  speed,
  hasStarted,
  toggleInterview,
}: {
  text: string;
  speed: number;
  hasStarted: boolean;
  toggleInterview: () => void;
}) => {
  useEffect(() => {
    console.log('logT', text);
  }, [text]);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (hasStarted) {
      let index = 0;
      if (index === 0) {
        setDisplayedText(text.charAt(index));
      }
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index += 1;

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [text, speed, hasStarted]);

  return (
    <div className="flex flex-col items-center">
      {!hasStarted ? (
        <>
          <p className="text-2xl text-left">
            You are about to start an interview with our AI Risk
            analyst, please follow the instructions, the more details
            you give us the better we can help you, press the button
            when you are ready.
          </p>
          <Button
            onClick={toggleInterview}
            className="mt-4 px-4 py-2 text-lg rounded w-64"
          >
            Start
          </Button>
        </>
      ) : (
        <p className="text-2xl leading-8	text-balance ">
          {displayedText}
        </p>
      )}
    </div>
  );
};

export default TypingTextWithVoice;
