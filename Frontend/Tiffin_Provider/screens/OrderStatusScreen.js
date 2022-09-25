import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Order, User} from '../src/models';
import OrderStatusComponent from '../component/OrderStatusComponent';
import {DataStore} from 'aws-amplify';
import {useAuthContext} from '../src/Contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const OrderStatusScreen = () => {
  const {dbRestaurant} = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [ongoingOrders, setOngoingOrders] = useState([]);

  const fetchOrders = async () => {
    const order = await DataStore.query(Order, order =>
      order.and(order =>
        order.orderRestaurantId('eq', dbRestaurant.id).status('eq', 'NEW'),
      ),
    );
    setOrders(order);
  };
  const fetchOngoing = async () => {
    const order = await DataStore.query(Order, order =>
      order.and(order =>
        order.orderRestaurantId('eq', dbRestaurant.id).status('eq', 'COOKING'),
      ),
    );
    setOngoingOrders(order);
  };

  useEffect(() => {
    fetchOrders();
    fetchOngoing();
    const subscription = DataStore.observe(Order).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        fetchOrders();
        fetchOngoing();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={{paddingTop: 10, backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={28}
          color={'red'}
          style={{}}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            fontSize: 20,
            color: 'black',
            marginHorizontal: 10,
          }}>
          Current Orders:
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          marginVertical: 18,
          marginHorizontal: 15,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <FlatList
          data={orders}
          renderItem={({item}) => {
            return <OrderStatusComponent order={item} />;
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="online-prediction"
          size={28}
          color={'red'}
          style={{}}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            fontSize: 20,
            color: 'black',
            marginHorizontal: 10,
          }}>
          Ongoing Orders:
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          marginVertical: 18,
          marginHorizontal: 15,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <FlatList
          data={ongoingOrders}
          renderItem={({item}) => {
            return <OrderStatusComponent order={item} />;
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default OrderStatusScreen;
