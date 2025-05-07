import { useState, useEffect, useCallback } from 'react';






export const useTimer = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const resetTimer = useCallback(() => {
    setTimer(initialTime);
  }, [initialTime]);

  return { timer, resetTimer };
};