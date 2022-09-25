import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Restaurant} from '../src/models';
import {DataStore} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';

const Offer = ({coupon}) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    DataStore.query(Restaurant, coupon.restaurantID).then(setRestaurant);
  }, []);

  return (
    <View
      style={{
        height: 155,
        width: 160,
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 5,
      }}>
      <View style={{}}>
        {/* <Image
          source={{
            uri: restaurant?.restaurantImage,
          }}
          style={styles.image}></Image> */}
        <S3Image imgKey={restaurant?.restaurantImage} style={styles.image} />
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 4,
          top: 82,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#8f58c7',
            fontWeight: 'bold',
          }}>
          {coupon.offerPercentage}% OFF Upto {'\u20B9'}
          {coupon.uptoPrice}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 15}}>
          {restaurant?.restaurantName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 8,
          alignItems: 'center',
        }}>
        <Entypo name="star" size={15} color="#fcba03" />
        <Text style={{fontSize: 12, color: 'black', marginHorizontal: 3}}>
          {restaurant?.rating}
        </Text>
        <Text
          style={{
            marginBottom: 8,
            color: '#666563',
            marginLeft: 6,
            fontWeight: 'bold',
          }}>
          .
        </Text>
        <Text style={{fontSize: 12, color: 'black', marginHorizontal: 6}}>
          {restaurant?.timeToDeliver}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 105,
    width: 145,
    alignSelf: 'center',
    borderRadius: 12,
  },
});
export default Offer;
