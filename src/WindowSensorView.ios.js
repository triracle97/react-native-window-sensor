import React, { useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  findNodeHandle,
  StyleSheet,
} from 'react-native';
import useSensorManager from './useSensorManager';

const LINKING_ERROR =
  `The package 'react-native-window-sensor' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ComponentName = 'WindowSensorView';

const RNTWindowSensorView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };

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
      UIManager.getViewManagerConfig('WindowSensorView').Commands
        .measureAbsolutePosition,
      []
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
