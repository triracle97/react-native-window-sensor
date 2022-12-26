import * as React from 'react';

import FlatListWithSensor from './FlatListWithSensor';
import WhitePage from './WhitePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={FlatListWithSensor} />
      <Tab.Screen name="Settings" component={WhitePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}
