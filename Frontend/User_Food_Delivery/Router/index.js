import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNav from './bottomTabNav';
import AddressScreen from '../screens/AddressScreen';
import {useAuthContext} from '../src/Contexts/AuthContext';

const index = () => {
  const Tab = createBottomTabNavigator();
  const Root = createStackNavigator();
  const {dbUser} = useAuthContext();
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer>
    //   <Root.Navigator screenOptions={{headerShown: false}}>
    //     <Root.Screen component={BottomTabNav} name="HomeTabs" />
    //   </Root.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator>
        {dbUser ? (
          <Stack.Screen
            component={BottomTabNav}
            name="BottomTabs"
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            component={AddressScreen}
            name="AddressScreen"
            options={{headerShown: false}}
          />
        )}
        {/* <Stack.Screen
          component={BottomTabNav}
          name="BottomTabs"
          options={{headerShown: false}}
        />
        <Stack.Screen component={AddressScreen} name="AddressScreen" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
