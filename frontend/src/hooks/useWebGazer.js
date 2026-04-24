import { useCallback, useEffect, useRef } from 'react';

export function useWebGazer({ onGaze, enabled, onError }) {
  const listenerRef = useRef(onGaze);
  const startedRef = useRef(false);

  useEffect(() => {
    listenerRef.current = onGaze;
  }, [onGaze]);

  const startTracking = useCallback(async () => {
    if (startedRef.current) return;

    if (!window.webgazer) {
      const error = new Error('WebGazer not loaded. Add the CDN script in index.html.');
      onError?.(error);
      throw error;
    }

    try {
      await window.webgazer
        .setRegression('ridge')
        .setTracker('TFFacemesh')
        .setGazeListener((data) => {
          if (!data) return;
          listenerRef.current?.({
            x: data.x,
            y: data.y,
            ts: Date.now(),
          });
        })
        .begin();

      window.webgazer.showPredictionPoints(false);
      window.webgazer.showVideoPreview(true);
      window.webgazer.showFaceOverlay(false);
      startedRef.current = true;
    } catch (err) {
      onError?.(err);
      throw err;
    }
  }, [onError]);

  const stopTracking = useCallback(() => {
    if (!window.webgazer) return;

    try {
      window.webgazer.clearGazeListener();
      window.webgazer.end();
    } catch (_err) {
      // No-op if webgazer internals already stopped.
    }

    startedRef.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) {
      stopTracking();
      return;
    }

    startTracking();

    return () => {
      stopTracking();
    };
  }, [enabled, startTracking, stopTracking]);

  return { startTracking, stopTracking };
}
