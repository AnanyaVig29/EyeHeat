import { useCallback, useEffect, useRef } from 'react';
import webgazer from 'webgazer';

export function useWebGazer({ onGaze, enabled, onError }) {
  const listenerRef = useRef(onGaze);
  const startedRef = useRef(false);

  useEffect(() => {
    listenerRef.current = onGaze;
  }, [onGaze]);

  const startTracking = useCallback(async () => {
    if (startedRef.current) return;

    if (!webgazer) {
      const error = new Error('WebGazer missing.');
      onError?.(error);
      throw error;
    }

    try {
      await webgazer
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

      webgazer.showPredictionPoints(false);
      webgazer.showVideoPreview(true);
      webgazer.showFaceOverlay(false);
      startedRef.current = true;
    } catch (err) {
      onError?.(err);
      throw err;
    }
  }, [onError]);

  const stopTracking = useCallback(() => {
    if (!webgazer) return;

    try {
      webgazer.clearGazeListener();
      webgazer.end();
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
