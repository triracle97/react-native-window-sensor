import { Dimensions } from "react-native";

class _SensorManager {
  constructor({ width, height }) {
    this.sensorMap = {};
    this.screenSensorMap = {};
    this.screenWidth = width;
    this.screenHeight = height;
  }

  registerSensor({ id, measureFn, screen }) {
    this.sensorMap[id] = {
      measureFn,
      screen
    };
    if (!this.screenSensorMap[screen]) {
      this.screenSensorMap[screen] = {};
    }
    this.screenSensorMap[screen][id] = true;
  }

  deregisterSensor({ id, screen }) {
    delete this.sensorMap[id];
    delete this.screenSensorMap[screen]?.[id];
  }

  callMeasureForScreen(screen) {
    if (!this.screenSensorMap[screen])
      return;
    Object.keys(this.screenSensorMap[screen]).forEach(sensorId => {
      if (this.sensorMap[sensorId]) {
        this.sensorMap[sensorId].measureFn();
      }
    })
  }

  callMeasure(ids) {
    ids.forEach(id => {
      if (this.sensorMap[id]) {
        this.sensorMap[id].measureFn();
      }
    });
  }
}

const { width, height } = Dimensions.get('window');
export const SensorManager = new _SensorManager({ width, height });
