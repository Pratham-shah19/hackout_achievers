import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './HomeStack';
import OrderStack from './OrderStack';
import AccountStack from './AccountStack';
import FavouriteScreen from '../screens/FavouriteScreen';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarInactiveTintColor: '#dfc5fa',
        tabBarActiveTintColor: '#af7ae6',
        headerShown: false,
        // tabBarBackground: 'blue',
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          // tabBarShowLabel: false,
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={FavouriteScreen}
        name="Favourites"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Ionicons name="heart" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={OrderStack}
        name="Orders"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Foundation name="clipboard-notes" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={AccountStack}
        name="Profile"
        options={{
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          headerShown: false,
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
