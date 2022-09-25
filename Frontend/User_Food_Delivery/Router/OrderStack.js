import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderScreen from '../screens/OrderScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import BasketScreen from '../screens/BasketScreen';
import OrderDetailNavigator from './OrderDetailNavigator';

const OrderStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={OrderScreen}
        name="OrderScreen"
        screenOptions={{headerShown: false}}
      />
      <Stack.Screen
        component={OrderDetailNavigator}
        name="OrderDetailNavigator"
        screenOptions={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
