import {View, Text} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {DataStore, loadingBar} from 'aws-amplify';
import {Courier, Order} from '../src/models';
import Fontisto from 'react-native-vector-icons/Fontisto';

const DriverLiveUpdateScreen = ({id}) => {
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, []);

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        setOrder(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (order?.orderCourierId) {
      DataStore.query(Courier, order.orderCourierId).then(setCourier);
    }
  }, [order?.orderCourierId]);

  useEffect(() => {
    if (courier?.lat && courier?.lng) {
      mapRef.current.animateToRegion({
        latitude: courier.lat,
        longitude: courier.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [courier?.lat, courier?.lng]);

  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = DataStore.observe(Courier, courier.id).subscribe(
      msg => {
        if (msg.opType === 'UPDATE') {
          setCourier(msg.element);
        }
      },
    );
    return () => subscription.unsubscribe();
  }, [courier]);

  return (
    <View>
      <Text>Status: {order?.status || 'loading'}</Text>
      <MapView
        style={{height: '100%', width: '100%'}}
        ref={mapRef}
        showsUserLocation>
        {courier?.lat && (
          <Marker
            coordinate={{
              latitude: courier.lat,
              longitude: courier.lng,
            }}>
            <Fontisto name="motorcycle" size={25} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default DriverLiveUpdateScreen;
