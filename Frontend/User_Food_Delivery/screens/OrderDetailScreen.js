import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import Orders from '../data/Orders.json';
import RestaurantNearbyMeData from '../data/RestaurantNearbyMeData.json';
import DishDetailScreen from './DishDetailScreen';
import ProductScreenComponent from '../components/ProductScreenComponent';
import OrderListItemComponent from '../components/DishDetailComponent/OrderListItemComponent';
import {useOrderContext} from '../src/Contexts/OrderContext';
import {useRoute} from '@react-navigation/native';
import BasketDishItem from '../components/BasketDishScreen/BasketDishItem';
import {S3Image} from 'aws-amplify-react-native';

// const order = Orders[0];
const OrderDetail = ({order}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{height: 290}}>
        {/* <Image
          source={{
            uri: order.Restaurant?.restaurantImage,
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
        /> */}
        <S3Image
          imgKey={order.Restaurant?.restaurantImage}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View style={{backgroundColor: 'white'}}>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              fontFamily: 'Fredoka-Medium',
              marginHorizontal: 15,
            }}>
            {order.Restaurant?.restaurantName}
          </Text>
        </View>
        <View style={{margin: 15, marginTop: 5}}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              lineHeight: 20,
              fontFamily: 'Fredoka-Regular',
            }}>
            {order.status} &#8226; 2 days ago
          </Text>
        </View>
      </View>
    </View>
  );
};
// const restaurant = RestaurantNearbyMeData[0];
const OrderDetailScreen = ({id}) => {
  const [order, setOrder] = useState();
  const {getOrder} = useOrderContext();
  // const route = useRoute();
  // const id = route.params?.id;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);
  console.log(order);

  if (!order) {
    return <ActivityIndicator size={'large'} color={'white'} />;
  }
  return (
    <FlatList
      style={{backgroundColor: 'white'}}
      ListHeaderComponent={() => <OrderDetail order={order} />}
      data={order?.dishes}
      renderItem={({item}) => <OrderListItemComponent basketDish={item} />}
    />
  );
};

export default OrderDetailScreen;
