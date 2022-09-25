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
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DataStore} from 'aws-amplify';
import {Courier} from '../src/models';
import {useOrderContext} from '../src/Contexts/OrderContext';
import BottomSheetDetails from './BottomSheetDetails';
import {useAuthContext} from '../src/Contexts/AuthContext';
const OrderDeliveryScreen = () => {
  const {fetchOrder, order, user} = useOrderContext();
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const {dbCourier, setDbCourier} = useAuthContext();
  const [isDriverClose, setIsDriverClose] = useState(false);
  const BottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  useEffect(() => {
    if (!driverLocation) {
      return;
    }
    DataStore.save(
      Courier.copyOf(dbCourier, updated => {
        updated.lat = driverLocation.latitude;
        updated.lng = driverLocation.longitude;
      }),
    );
  }, [driverLocation]);

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

    const foreGroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 300,
      },
      updatedLocation => {
        setDriverLocation({
          latitude: updatedLocation?.coords?.latitude,
          longitude: updatedLocation?.coords?.longitude,
        });
      },
    );
    return foreGroundSubscription;
  }, []);

  const onZoomInDriver = () => {
    mapRef.current.animateToRegion({
      latitude: driverLocation?.latitude,
      longitude: driverLocation?.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  // if (!driverLocation) {
  //   return <ActivityIndicator size={'large'} />;
  // }
  if (!order || !user || !driverLocation) {
    return <ActivityIndicator size={'large'} color={'gray'} />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}>
      <MapView
        ref={mapRef}
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
        <MapViewDirections
          origin={driverLocation}
          destination={
            order.status === 'ACCEPTED'
              ? {
                  latitude: order?.Restaurant?.lat,
                  longitude: order?.Restaurant?.lng,
                }
              : {latitude: user?.lat, longitude: user?.lng}
          }
          waypoints={
            order.status === 'READY_FOR_PICKUP'
              ? [
                  {
                    latitude: order?.Restaurant?.lat,
                    longitude: order?.Restaurant?.lng,
                  },
                ]
              : []
          }
          strokeWidth={10}
          strokeColor={'#4f81ff'}
          apikey="AIzaSyA4mo5tDVFp1fq1aZHh-5cH-9xC6sruw2s"
          onReady={result => {
            // setIsDriverClose(result.distance <= 0.1);
            setTotalTime(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <Marker
          title={order.Restaurant?.restaurantName}
          coordinate={{
            latitude: order?.Restaurant?.lat,
            longitude: order?.Restaurant?.lng,
          }}
          description={order.Restaurant?.address}>
          <View
            style={{backgroundColor: 'orange', borderRadius: 6, padding: 5}}>
            <MaterialIcons name="restaurant" size={15} color={'white'} />
          </View>
        </Marker>
        <Marker
          title={user?.name}
          coordinate={{
            latitude: user?.lat,
            longitude: user?.lng,
          }}
          description={user?.address}>
          <View style={{backgroundColor: 'white', borderRadius: 6, padding: 5}}>
            <Entypo name="user" size={15} color={'black'} />
          </View>
        </Marker>
      </MapView>
      <BottomSheetDetails
        totalTime={totalTime}
        totalKm={totalKm}
        onAccepted={onZoomInDriver}
      />
      {order.status === 'READY_FOR_PICKUP' && (
        <Pressable
          style={{
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 5,
            position: 'absolute',
            top: 30,
            left: 40,
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={18} color={'black'} />
        </Pressable>
      )}
    </View>
  );
};

export default OrderDeliveryScreen;
