import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useRef, useMemo, useState, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import OrderData from '../data/OrderData.json';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DataStore} from 'aws-amplify';
import * as Location from 'expo-location';
import {Order, Courier} from '../src/models';
import OrderScreenComponent from '../component/OrderScreenComponent';
import {useAuthContext} from '../src/Contexts/AuthContext';
import GetLocation from 'react-native-get-location';

const OrderScreen = () => {
  const BottomSheetRef = useRef(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const {dbCourier, setDbCourier} = useAuthContext();
  const {width, height} = useWindowDimensions();
  const [orders, setOrders] = useState([]);
  const snapPoints = useMemo(() => ['12%', '95%'], []);
  const [location, setlocation] = useState(null);

  const fetchOrders = () => {
    DataStore.query(Order, order =>
      order.status('eq', 'READY_FOR_PICKUP'),
    ).then(setOrders);
  };

  useEffect(() => {
    fetchOrders();
    const subscription = DataStore.observe(Order).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        fetchOrders();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let {status} = await Location.requestForegroundPermissionsAsync();
  //     if (!status === 'granted') {
  //       console.log('Please give Permission');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync();
  //     setDriverLocation({
  //       latitude: location?.coords?.latitude,
  //       longitude: location?.coords?.longitude,
  //     });
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (!status === 'granted') {
        console.log('Please give Permission');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    })();
  }, []);

  // const getLocation = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(responseJson => {
  //       var location = responseJson;
  //       setlocation(location);
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });
  // };

  // if (!orders) {
  //   return <ActivityIndicator size={'large'} color="gray" />;
  // }
  if (!driverLocation) {
    return <ActivityIndicator size={'large'} color="gray" />;
  }

  return (
    <View style={{backgroundColor: 'lightblue', flex: 1}}>
      <MapView
        followsUserLocation={true}
        showsUserLocation={true}
        style={{
          height: height,
          width: width,
        }}
        initialRegion={{
          latitude: driverLocation?.latitude,
          longitude: driverLocation?.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}>
        {orders.map(order => (
          <Marker
            key={order.id}
            coordinate={{
              latitude: order.Restaurant.lat,
              longitude: order.Restaurant.lng,
            }}
            title={order.Restaurant.restaurantName}
            description={order.Restaurant.address}>
            <View
              style={{backgroundColor: 'orange', borderRadius: 6, padding: 5}}>
              <MaterialIcons name="restaurant" size={15} color={'white'} />
            </View>
          </Marker>
        ))}
      </MapView>
      <BottomSheet ref={BottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Fredoka-Medium',
              color: 'black',
              fontSize: 18,
            }}>
            You are online
          </Text>
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              color: 'grey',
              marginTop: 3,
            }}>
            Available orders: {orders.length}
          </Text>
        </View>
        <View style={{marginTop: 25}}>
          <FlatList
            data={orders}
            renderItem={({item}) => {
              return <OrderScreenComponent order={item} />;
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrderScreen;
