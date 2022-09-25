import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DataStore} from 'aws-amplify';
import {Dish} from '../src/models';
import {useAuthContext} from '../src/Contexts/AuthContext';

const DishScreenItemComponent = ({dish}) => {
  const {dbRestaurant} = useAuthContext();
  const onDelete = async () => {
    const todelete = await DataStore.query(Dish, dish.id);
    DataStore.delete(todelete);
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        padding: 5,
        marginTop: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
      }}>
      <View style={{flex: 2}}>
        <Image
          source={{uri: dish.productImage}}
          style={{height: 70, width: 70, borderRadius: 10}}
        />
      </View>
      <View style={{flex: 4, marginHorizontal: 8}}>
        <Text
          style={{color: 'black', fontFamily: 'Fredoka-Regular', fontSize: 15}}>
          {dish.productName}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 12,
            marginTop: 4,
          }}>
          {dish.productCategory}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="star" size={13} color={'#5e5e5e'} />
          <Text style={{color: 'black', fontSize: 11, marginHorizontal: 2}}>
            {dish.productRating}
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            marginTop: 4,
            fontWeight: '400',
          }}>
          Rs.{dish.productPrice}
        </Text>
      </View>
      <Pressable style={{flex: 1, alignItems: 'center'}} onPress={onDelete}>
        <MaterialIcons name="delete" size={20} color={'#878787'} />
      </Pressable>
    </View>
  );
};

export default DishScreenItemComponent;
