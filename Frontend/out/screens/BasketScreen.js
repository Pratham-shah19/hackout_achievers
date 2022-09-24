import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useBasketContext} from '../src/Contexts/BasketContext';
import {useOrderContext} from '../src/Contexts/OrderContext';
import {useNavigation} from '@react-navigation/native';
import BasketDishItem from '../components/BasketDishScreen/BasketDishItem';

const BasketScreen = () => {
  const {restaurant, basketDishes, totalPrice} = useBasketContext();
  const {createOrder} = useOrderContext();
  const navigation = useNavigation();
  const onCreateOrder = async () => {
    const newOrder = await createOrder();
    navigation.navigate('Orders', {
      screen: 'OrderDetailNavigator',
      params: {id: newOrder.id},
    });
  };
  return (
    <View style={{padding: 10}}>
      <View style={{marginBottom: 8, marginTop: 10}}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            alignSelf: 'center',
          }}>
          {restaurant?.restaurantName}
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Fredoka-Regular',
          }}>
          Your Items:
        </Text>
      </View>
      <FlatList
        data={basketDishes}
        renderItem={({item}) => <BasketDishItem basketDish={item} />}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#a26bdb',
          borderRadius: 5,
          padding: 10,
          paddingHorizontal: 28,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={onCreateOrder}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: 17,
            fontFamily: 'Fredoka-Regular',
          }}>
          Create Order &#8226; Rs.
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 17,
          }}>
          {totalPrice.toFixed(1)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketScreen;
