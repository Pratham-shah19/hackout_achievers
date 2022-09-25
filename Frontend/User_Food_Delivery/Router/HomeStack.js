import {View, StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import DishDetailScreen from '../screens/DishDetailScreen';
import BasketScreen from '../screens/BasketScreen';
import RestaurantImages from '../screens/RestaurantImages';
import ViewOfferScreen from '../screens/ViewOfferScreen';
const Stack = createStackNavigator();

const HeaderComponent = () => {
  return <View></View>;
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => <HeaderComponent />}}>
      <Stack.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        component={ProductScreen}
        name="ProductScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={DishDetailScreen}
        name="Dish"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={BasketScreen}
        name="BasketScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={RestaurantImages}
        name="RestaurantImages"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ViewOfferScreen}
        name="ViewOfferScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  searchIcon: {
    padding: 7,
  },
  input: {
    flex: 1,

    paddingLeft: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

export default HomeStack;
