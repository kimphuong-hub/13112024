import { useEffect, useState } from 'react';

export const useKeyPress = (keys: string | string[], handler: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // Check if the pressed key matches the target key
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === key) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler, keys]);
};

export const useAltKeyDoublePress = (keys: string[], handler: (event: KeyboardEvent) => void, timeout = 1000) => {
  const [keyPresses, setKeyPresses] = useState<{ time: number; event: KeyboardEvent }[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, altKey } = event;

      // Check if the pressed key matches the target key combination
      if (altKey || keys.includes(key)) {
        setKeyPresses((prev) => [...prev, { time: Date.now(), event }]);
      }
    };

    const handleKeyUp = () => {
      // Optional: Reset keyPresses state on key release
      setKeyPresses([]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]);

  useEffect(() => {
    if (keyPresses.length >= 2) {
      const [firstPress, secondPress] = keyPresses.slice(-2);

      if (secondPress.time - firstPress.time < timeout) {
        // If the two key presses occur within the timeout period, trigger the callback
        handler(secondPress.event);
        setKeyPresses([]); // Reset the key presses after handling the double press
      }
    }
  }, [keyPresses, handler, timeout]);
};
