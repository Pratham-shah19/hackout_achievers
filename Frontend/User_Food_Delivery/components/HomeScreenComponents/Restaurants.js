import React from 'react';
import {View, Text, Image, Animated, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {S3Image} from 'aws-amplify-react-native';

const Restaurant = ({restaurant}) => {
  const DEFAULT_IMAGE =
    'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Waagmi_Soni/Gralic_Crust_Veggie_Pizza.jpg';
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ProductScreen', {id: restaurant.id});
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        marginVertical: 10,
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1, alignContent: 'center'}}>
        {/* <Image
          source={{
            uri: restaurant.restaurantImage.startsWith('http')
              ? restaurant.restaurantImage
              : DEFAULT_IMAGE,
          }}
          style={{
            height: 100,
            width: 90,
            alignSelf: 'center',
            borderRadius: 10,
          }}></Image> */}
        <S3Image
          imgKey={restaurant.restaurantImage}
          style={{
            height: 100,
            width: 90,
            alignSelf: 'center',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            borderRadius: 5,
            top: '73%',
            left: '24%',
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}>
          <Text style={{color: '#8f58c7', fontWeight: 'bold', fontSize: 13}}>
            60% OFF
          </Text>
          <Text style={{color: '#8f58c7', fontSize: 10}}>
            Upto {'\u20B9'}125
          </Text>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <View>
          <Text
            style={{
              fontFamily: 'Fredoka-Medium',
              color: 'black',
              fontSize: 15,
            }}>
            {restaurant.restaurantName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="star" size={15} color="#666563" />
            <Text
              style={{
                color: '#666563',
                fontSize: 12,
                marginLeft: 4,
                fontWeight: 'bold',
              }}>
              {restaurant.rating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginBottom: 8,
                color: '#666563',
                marginLeft: 6,
                fontWeight: 'bold',
              }}>
              .
            </Text>
            <Text
              style={{
                color: '#666563',
                fontSize: 12,
                marginLeft: 8,
                fontWeight: 'bold',
              }}>
              {restaurant.timeToDeliver} mins
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
          </View>
        </View>
        <View>
          <Text
            style={{
              color: 'gray',
              fontFamily: 'Fredoka-Regular',
              fontSize: 13,
            }}>
            {restaurant.category}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Restaurant;
