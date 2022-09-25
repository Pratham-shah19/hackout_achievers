import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CouponScreen from '../screens/CouponScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {createStackNavigator} from '@react-navigation/stack';
import StatusDetailScreen from '../screens/StatusDetailScreen';
import History from '../screens/History';
import CreateDishScreen from '../screens/CreateDishScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddImageScreen from '../screens/AddImageScreen';
import CreateNewDishScreen from '../screens/CreateNewDishScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#f5c3bf',
        tabBarActiveTintColor: '#f7442d',
      }}>
      <Tab.Screen
        component={CreateDishScreenStack}
        name="Dishes"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Ionicons name="fast-food" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={OrderStatusStack}
        name="Orders"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <MaterialIcons name="border-color" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={CouponScreen}
        name="Coupons"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <MaterialIcons name="local-offer" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileScreenStack}
        name="Profile"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            // <Octicons name="checklist" size={23} color={color} />
            <AntDesign name="user" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const OrderStatusStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={OrderStatusScreen} name="OrderStatusScreen" />
      <Stack.Screen component={StatusDetailScreen} name="StatusDetailScreen" />
    </Stack.Navigator>
  );
};
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen
        component={RestaurantDetailScreen}
        name="RestaurantDetailScreen"
      />
      <Stack.Screen component={History} name="History" />
      <Stack.Screen component={AddImageScreen} name="AddImageScreen" />
    </Stack.Navigator>
  );
};

const CreateDishScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={CreateDishScreen} name="CreateDishScreen" />
      <Stack.Screen
        component={CreateNewDishScreen}
        name="CreateNewDishScreen"
      />
    </Stack.Navigator>
  );
};
