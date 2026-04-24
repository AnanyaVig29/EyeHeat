import { useCallback, useRef } from 'react';

const DEFAULT_MAX_POINTS = 2000;

export function useGazeBuffer(maxPoints = DEFAULT_MAX_POINTS) {
  const bufferRef = useRef([]);

  const push = useCallback(
    (point) => {
      bufferRef.current.push(point);
      if (bufferRef.current.length > maxPoints) {
        bufferRef.current.shift();
      }
    },
    [maxPoints]
  );

  const getAll = useCallback(() => [...bufferRef.current], []);
  const clear = useCallback(() => {
    bufferRef.current = [];
  }, []);
  const getSize = useCallback(() => bufferRef.current.length, []);

  return { push, getAll, clear, getSize };
}
