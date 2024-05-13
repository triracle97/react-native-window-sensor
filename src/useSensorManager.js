import { useEffect } from 'react';
import { SensorManager } from './sensorManager';

export default function useSensorManager({
  id,
  measureAbsolutePosition,
  onCustomMeasure,
  onViewPort,
  screen,
}) {
  useEffect(() => {
    SensorManager.registerSensor({
      id,
      measureFn: measureAbsolutePosition,
      screen,
    });
    return () => {
      SensorManager.deregisterSensor({ id, screen });
    };
  }, []);

  const onMeasure = (e) => {
    onCustomMeasure && onCustomMeasure(e);
    if (onViewPort) {
      const { x, y, x1, y1 } = e.nativeEvent;
      if (x != 0 || y != 0) {
        const intersectionLeft = Math.max(x, 0);
        const intersectionTop = Math.max(y, 0);
        const intersectionRight = Math.min(x1, SensorManager.screenWidth);
        const intersectionBottom = Math.min(y1, SensorManager.screenHeight);
        const intersectionWidth = Math.max(
          0,
          intersectionRight - intersectionLeft
        );
        const intersectionHeight = Math.max(
          0,
          intersectionBottom - intersectionTop
        );
        const intersectionAreaPercentage =
          (intersectionWidth * intersectionHeight) / ((x1 - x) * (y1 - y));
        const isWidthFullyShow = (intersectionWidth === x1 - x);
        const isHeightFullyShow = (intersectionHeight === y1 - y)

        onViewPort({
          intersectionAreaPercentage,
          intersectionHeight,
          intersectionWidth,
          isWidthFullyShow,
          isHeightFullyShow
        });
      }
    }
  };

  return {
    onMeasure,
  };
}
