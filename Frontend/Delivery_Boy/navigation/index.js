import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import OrderDeliveryScreen from '../screens/OrderDeliveryScreen';
import OrderScreen from '../screens/OrderScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddressScreen from '../screens/AddressScreen';
import {useAuthContext} from '../src/Contexts/AuthContext';

const Stack = createNativeStackNavigator();
const index = () => {
  const {dbCourier, loading} = useAuthContext();

  if (loading) {
    return <ActivityIndicator size={'large'} color={'gray'} />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {dbCourier ? (
        <>
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen
            name="OrderDeliveryScreen"
            component={OrderDeliveryScreen}
          />
        </>
      ) : (
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
      )}
    </Stack.Navigator>
  );
};

export default index;
