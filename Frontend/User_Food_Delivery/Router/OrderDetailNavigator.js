import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import DriverLiveUpdateScreen from '../screens/DriverLiveUpdateScreen';

const Tab = createMaterialTopTabNavigator();
const OrderDetailNavigator = ({route}) => {
  const id = route?.params?.id;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Order Details">
        {() => <OrderDetailScreen id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Driver Live Updates">
        {() => <DriverLiveUpdateScreen id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default OrderDetailNavigator;
