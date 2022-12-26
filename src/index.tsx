import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-window-sensor' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type WindowSensorProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'WindowSensorView';

export const WindowSensorView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<WindowSensorProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
