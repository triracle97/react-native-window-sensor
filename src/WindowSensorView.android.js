import React, { useImperativeHandle, useRef } from 'react';
import {
  findNodeHandle,
  UIManager,
  requireNativeComponent,
  StyleSheet
} from 'react-native';
import useSensorManager from './useSensorManager';

const RNTWindowSensorView = requireNativeComponent('WindowSensorView');

function _WindowSensorView(
  { id, containerStyles = null, onCustomMeasure, onViewPort, screen },
  ref
) {
  const sensorRef = useRef(null);

  const measureAbsolutePosition = () => {
    const currentSensor = findNodeHandle(sensorRef.current);
    if (!currentSensor)
      return;
    UIManager.dispatchViewManagerCommand(
      currentSensor,
      UIManager?.WindowSensorView?.Commands.measureAbsolutePosition.toString(),
      [currentSensor]
    );
  };

  useImperativeHandle(ref, () => ({
    measureAbsolutePosition,
  }));

  const { onMeasure } = useSensorManager({
    id,
    measureAbsolutePosition,
    onCustomMeasure,
    onViewPort,
    screen,
  });

  return (
    <RNTWindowSensorView
      ref={sensorRef}
      style={containerStyles ? containerStyles : StyleSheet.absoluteFillObject}
      onCustomMeasure={onMeasure}
    />
  );
}

export const WindowSensorView = React.forwardRef(_WindowSensorView);
