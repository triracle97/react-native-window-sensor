import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  findNodeHandle
} from 'react-native';

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
    }

export class WindowSensorView extends React.Component {
  measureAbsolutePosition = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig('WindowSensorView').Commands
        .measureAbsolutePosition,
      [],
    );
  }
  render() {
    return <RNTWindowSensorView {...this.props}/>
  }
}
