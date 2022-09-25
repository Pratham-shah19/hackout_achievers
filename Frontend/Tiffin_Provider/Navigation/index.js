import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import BottomTabNav from './BottomTabNav';
import {useAuthContext} from '../src/Contexts/AuthContext';

const Stack = createStackNavigator();

const index = () => {
  const {dbRestaurant, loading} = useAuthContext();
  if (loading) {
    return <ActivityIndicator size={'large'} color={'gray'} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {dbRestaurant ? (
          <Stack.Screen
            component={BottomTabNav}
            name="BottomTabBarNavigation"
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            component={RestaurantDetailScreen}
            name="RestaurantDetailScreen"
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
