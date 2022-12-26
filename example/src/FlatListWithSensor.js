import * as React from 'react';

import { StyleSheet, View, FlatList } from 'react-native';
import { WindowSensorView } from 'react-native-window-sensor';

const data = [
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: true
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
  {
    needSensor: false
  },
]

export default function FlatListWithSensor() {
  const ref = React.useRef();

  React.useEffect(() => {
    const itv = setInterval(() => {
      ref?.current?.measureAbsolutePosition();
    }, 2000)
    return () => {
      clearInterval(itv);
    }
  })

  function renderItem({ item }) {
    return <View style={styles.container}>
      {item?.needSensor &&
        <WindowSensorView
          onCustomMeasure={(res) => {
            console.log(res.nativeEvent);
          }}
          ref={ref} color="#32a852"
          style={styles.box} />}
    </View>
  }

  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      keyExtractor={(item, index) => `item.${index}`}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    width: '100%',
    backgroundColor: 'red',
    marginTop: 30
  },
  box: {
    width: 60,
    height: 60
  },
});
