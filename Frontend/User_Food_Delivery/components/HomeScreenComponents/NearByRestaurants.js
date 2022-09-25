import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Animated} from 'react-native';
import Restaurants from './Restaurants';
import {DataStore} from 'aws-amplify';
import {Restaurant} from '../../src/models';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NearbyRestaurants = () => {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurant);
  }, []);
  return (
    <View style={{backgroundColor: 'white'}}>
      {/* <View
        style={{
          height: 8,
          marginVertical: 14,
        }}></View> */}
      <View style={{margin: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 15,
              borderColor: '#8f58c7',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
            }}>
            <MaterialIcons name="restaurant" size={18} color="black" />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Fredoka-Medium',
              marginLeft: 4,
              color: 'black',
            }}>
            All Restaurants Nearby
          </Text>
        </View>
        <Text
          style={{color: 'gray', marginTop: 3, fontFamily: 'Fredoka-Regular'}}>
          Discover unique taste near you
        </Text>
      </View>
      <FlatList
        data={restaurant}
        renderItem={({item}) => {
          return <Restaurants restaurant={item} />;
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NearbyRestaurants;
