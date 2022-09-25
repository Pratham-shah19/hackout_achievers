import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DataStore} from 'aws-amplify';
import {useAuthContext} from '../src/Contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrderCompleted from '../component/OrderCompleted';
import {Order, User} from '../src/models';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const History = () => {
  const {dbRestaurant} = useAuthContext();
  const navigation = useNavigation();
  const [completedOrder, setCompletedOrder] = useState([]);
  const completedOrders = async () => {
    const order = await DataStore.query(Order, order =>
      order.and(order =>
        order
          .orderRestaurantId('eq', dbRestaurant.id)
          .status('eq', 'COMPLETED'),
      ),
    );
    setCompletedOrder(order);
  };
  useEffect(() => {
    completedOrders();

    const subscription = DataStore.observe(Order).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        completedOrders();
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <MaterialIcons
          name="file-download-done"
          size={32}
          color={'green'}
          style={{}}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            fontSize: 20,
            color: 'black',
            marginHorizontal: 10,
          }}>
          Completed Orders:
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
          data={completedOrder}
          renderItem={({item}) => {
            return <OrderCompleted order={item} />;
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 7,
          left: 0,
          width: 35,
          height: 35,
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={28} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default History;
