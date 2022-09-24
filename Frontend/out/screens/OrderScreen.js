import {View, Text, FlatList} from 'react-native';
import React from 'react';
// import Orders from '../data/Orders.json';
import OrderListItem from '../components/OrderScreen/OrderListItem';
import {useOrderContext} from '../src/Contexts/OrderContext';

const OrderScreen = () => {
  const {orders} = useOrderContext();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Regular',
          fontSize: 17,
          alignSelf: 'center',
          marginVertical: 18,
        }}>
        Your Orders
      </Text>
      <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;
