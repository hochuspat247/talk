import { useState, useEffect, useCallback } from 'react';

/**
 * Хук для управления таймером с возможностью сброса.
 * @param initialTime - Начальное значение таймера в секундах.
 * @returns Объект с текущим значением таймера и функцией сброса.
 */
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