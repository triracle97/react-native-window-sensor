import React from 'react';
import { findNodeHandle, UIManager, requireNativeComponent } from "react-native";

const RNTWindowSensorView = requireNativeComponent('WindowSensorView');

export class WindowSensorView extends React.Component {
  measureAbsolutePosition = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager?.WindowSensorView?.Commands
        .measureAbsolutePosition.toString(),
      [findNodeHandle(this)],
    );
  }
  render() {
    return <RNTWindowSensorView {...this.props}/>
  }
}
