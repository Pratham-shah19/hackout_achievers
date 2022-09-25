import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useOrderContext} from '../src/Contexts/OrderContext';
import {User, Restaurant, Order} from '../src/models';
import {DataStore} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StatusDetailScreen = () => {
  const {user, fetchOrder, order, cookOrder, readyForPickUpOrder, dishes} =
    useOrderContext();
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  const onButtonPressed = async () => {
    if (order?.status === 'NEW') {
      navigation.goBack();
      await cookOrder();
      // onAccepted();
    }
    if (order?.status === 'COOKING') {
      navigation.goBack();
      await readyForPickUpOrder();
    }
  };

  const renderButtonTitle = () => {
    if (order?.status === 'NEW') {
      return 'Cooking';
    }
    if (order?.status === 'COOKING') {
      return 'Ready for Pickup';
    }
  };

  const isButtonDisabled = () => {
    if (order?.status === 'NEW') {
      return false;
    }
    if (order?.status === 'COOKING') {
      return false;
    }
    return true;
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      }}>
      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          textAlign: 'center',
          fontFamily: 'Fredoka-Regular',
          fontSize: 20,
          marginVertical: 10,
        }}>
        Modify Order Status
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <FontAwesome5
          name="user-alt"
          size={18}
          color={'black'}
          style={{marginHorizontal: 15}}
        />
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 17,
          }}>
          {user?.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <FontAwesome5
          name="home"
          color={'black'}
          style={{marginHorizontal: 15}}
          size={19}
        />
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 17,
          }}>
          {user?.address}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Ionicons
          name="ios-fast-food"
          size={21}
          color={'black'}
          style={{marginHorizontal: 15}}
        />
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 17,
          }}>
          Food Items:
        </Text>
      </View>
      <View>
        <FlatList
          data={dishes}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: item.Dish.productImage}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 12,
                  marginHorizontal: 5,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Fredoka-Regular',
                  fontSize: 16,
                  marginHorizontal: 10,
                }}
                key={item.id}>
                {item.Dish.productName} x {item.quantity}
              </Text>
            </View>
          )}
        />
      </View>
      <Pressable
        style={{
          backgroundColor: isButtonDisabled() ? 'grey' : '#f7442d',
          marginHorizontal: 10,
          marginVertical: 20,
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
    </View>
  );
};

export default StatusDetailScreen;
