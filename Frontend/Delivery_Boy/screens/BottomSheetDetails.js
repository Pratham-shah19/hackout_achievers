import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useRef, useMemo, useState, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrderData from '../data/OrderData.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DataStore} from 'aws-amplify';
import {Order, User, OrderDish} from '../src/models';
import {useOrderContext} from '../src/Contexts/OrderContext';
import {S3Image} from 'aws-amplify-react-native';

const BottomSheetDetails = props => {
  const {totalKm, totalTime, onAccepted} = props;
  const isDriverClose = totalKm <= 0.3;
  const navigation = useNavigation();
  const {
    acceptOrder,
    fetchOrder,
    order,
    dishes,
    user,
    pickUpOrder,
    completeOrder,
  } = useOrderContext();
  const BottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['12%', '95%'], []);
  const onButtonPressed = async () => {
    if (order.status === 'READY_FOR_PICKUP') {
      BottomSheetRef.current?.collapse();
      await acceptOrder();
      onAccepted();
    }
    if (order.status === 'ACCEPTED') {
      BottomSheetRef.current?.collapse();
      await pickUpOrder();
    }
    if (order.status === 'PICKED_UP') {
      await completeOrder();
      BottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const renderButtonTitle = () => {
    if (order.status === 'READY_FOR_PICKUP') {
      return 'Accept Order';
    }
    if (order.status === 'ACCEPTED') {
      return 'Pick Up Order';
    }
    if (order.status === 'PICKED_UP') {
      return 'Complete delivery';
    }
  };

  const isButtonDisabled = () => {
    if (order.status === 'READY_FOR_PICKUP') {
      return false;
    }
    if (order.status === 'ACCEPTED' && isDriverClose) {
      return false;
    }
    if (order.status === 'PICKED_UP' && isDriverClose) {
      return false;
    }
    return true;
  };

  return (
    <BottomSheet
      ref={BottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      handleIndicatorStyle={{backgroundColor: 'grey', width: '30%'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 4,
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 24,
            marginHorizontal: 8,
          }}>
          {totalTime.toFixed(0)} min
        </Text>
        <FontAwesome name="shopping-basket" size={26} color={'#3fc060'} />
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 24,
            marginHorizontal: 8,
          }}>
          {totalKm.toFixed(1)} km
        </Text>
      </View>
      <View style={{padding: 10, paddingHorizontal: 15, marginTop: 23}}>
        {/* <Image
          source={{uri: order.Restaurant?.restaurantImage}}
          style={{
            height: 200,
            margin: 10,
            borderRadius: 15,
          }}
        /> */}
        <S3Image
          imgKey={order.Restaurant?.restaurantImage}
          style={{
            height: 200,
            // margin: 10,
            borderRadius: 15,
          }}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Medium',
            fontSize: 23,
            alignSelf: 'center',
            color: 'black',
            marginTop: 8,
          }}>
          {order.Restaurant?.restaurantName}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <MaterialIcons name="restaurant" size={28} />
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              fontSize: 18,
              color: 'black',
              marginHorizontal: 10,
            }}>
            {order.Restaurant?.address}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={28}
            color="#8f58c7"
          />
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              fontSize: 18,
              color: 'black',
              marginHorizontal: 10,
            }}>
            {user?.address}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          {/* {dishItem.map(dish => (
              <Text
                style={{
                  color: '#4f4f4f',
                  fontFamily: 'Fredoka-Regular',
                  fontSize: 16,
                  marginTop: 5,
                }}
                key={dish.id}>
                {dish.Dish.name} x {dish.quantity}
              </Text>
            ))} */}
          <FlatList
            data={dishes}
            renderItem={({item}) => (
              <Text
                style={{
                  color: '#4f4f4f',
                  fontFamily: 'Fredoka-Regular',
                  fontSize: 16,
                  marginTop: 5,
                }}
                key={item.id}>
                {item.Dish.productName} x {item.quantity}
              </Text>
            )}
          />
        </View>
      </View>
      <Pressable
        style={{
          marginTop: 'auto',
          backgroundColor: isButtonDisabled() ? 'grey' : '#3fc060',
          marginHorizontal: 10,
          marginBottom: 10,
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={onButtonPressed}
        disabled={isButtonDisabled()}>
        <Text
          style={{
            fontFamily: 'Fredoka-Medium',
            paddingVertical: 15,
            color: 'white',
            fontSize: 16,
          }}>
          {renderButtonTitle()}
        </Text>
      </Pressable>
    </BottomSheet>
  );
};

export default BottomSheetDetails;
