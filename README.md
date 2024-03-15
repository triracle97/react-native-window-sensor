# react-native-window-sensor

Sensor component

## Installation

```sh
npm install react-native-window-sensor
cd ios && pod install
```

## Usage

```js
import { WindowSensorView } from "react-native-window-sensor";

// ...

const handleMeasure = (e) => {
  console.log('4 corners', e.nativeEvent);
}

const handleOnViewPort = (e) => {
  const {
    intersectionAreaPercentage,
    intersectionHeight,
    intersectionWidth
  } = e;
}

<WindowSensorView
  screen={'screenName'}
  id={`sensorId`}
  onViewPort={handleOnViewPort} // this return intersectionArea, intersectionHeight and intersection Width of parent component
  onCustomMeasure={handleMeasure} // this return 4 corners of parent component
/>
```

Ask sensor to measure again:

```javascript
import { SensorManager } from 'react-native-window-sensor';

SensorManager.callMeasureForScreen(navigation.state.routeName);
SensorManager.callMeasure(idsArray); // measure by id
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
