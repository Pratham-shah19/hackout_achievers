import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import AddressScreen from '../screens/AddressScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import FavouriteScreen from '../screens/FavouriteScreen';

const AccountStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen component={AccountScreen} name="AccountScreen" />
      <Stack.Screen
        component={AddressScreen}
        name="AddressScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={OrderScreen}
        name="OrderScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={OrderDetailScreen}
        name="OrderDetailScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={FavouriteScreen}
        name="FavouriteScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
