import {View, Text, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import OrderData from '../data/OrderData.json';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {DataStore} from 'aws-amplify';
import {User} from '../src/models';
import {S3Image} from 'aws-amplify-react-native';

const OrderScreenComponent = ({order}) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(User, order.userID).then(setUser);
  }, []);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        margin: 5,
        borderColor: '#28ed3f',
        borderWidth: 1,
        borderRadius: 10,
        height: 110,
        marginVertical: 10,
      }}
      onPress={() =>
        navigation.navigate('OrderDeliveryScreen', {id: order.id})
      }>
      <View
        style={{
          flex: 3,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        {/* <Image
          source={{
            uri: order.Restaurant.restaurantImage,
          }}
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        /> */}
        <S3Image
          imgKey={order.Restaurant.restaurantImage}
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View style={{flex: 8, paddingVertical: 4, paddingHorizontal: 10}}>
        <Text
          style={{fontSize: 17, color: 'black', fontFamily: 'Fredoka-Medium'}}>
          {order.Restaurant.restaurantName}
        </Text>
        <Text
          style={{fontSize: 13, color: 'grey', fontFamily: 'Fredoka-Regular'}}>
          {order.Restaurant.address}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            marginVertical: 2,
            fontFamily: 'Fredoka-Medium',
          }}>
          Delivery Details:
        </Text>
        <Text
          style={{fontSize: 13, color: 'grey', fontFamily: 'Fredoka-Regular'}}>
          {user?.name}
        </Text>
        <Text
          style={{fontSize: 13, color: 'grey', fontFamily: 'Fredoka-Regular'}}>
          {user?.address}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#28ed3f',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Entypo name="check" size={25} color={'white'} />
      </View>
    </Pressable>
  );
};

export default OrderScreenComponent;
