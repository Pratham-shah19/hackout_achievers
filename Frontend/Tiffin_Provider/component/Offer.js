import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {DataStore} from 'aws-amplify';
import {Restaurant} from '../src/models';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {S3Image} from 'aws-amplify-react-native';

const Offer = ({scoupon}) => {
  const {id, sub} = useAuthContext();
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Restaurant, coupon => coupon.sub('eq', sub)).then(
      restaurants => {
        setRestaurant(restaurants[0]);
      },
    );
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
            color: '#f7442d',
            fontWeight: 'bold',
          }}>
          {scoupon.offerPercentage}% OFF Upto {'\u20B9'}
          {scoupon.uptoPrice}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}>
        <Text style={{fontFamily: 'Fredoka-Medium', color: 'black'}}>
          {restaurant?.restaurantName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 8,
          alignItems: 'center',
        }}>
        <Entypo name="star" size={15} color="orange" />
        <Text style={{fontSize: 12, color: 'black', marginHorizontal: 3}}>
          {restaurant?.rating}
        </Text>
        <Text style={{marginBottom: 5}}>.</Text>
        <Text style={{fontSize: 12, color: 'black', marginHorizontal: 6}}>
          {restaurant?.timeToDeliver} mins
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
