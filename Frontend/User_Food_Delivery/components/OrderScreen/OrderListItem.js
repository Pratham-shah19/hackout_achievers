import {View, Text, Image, Pressable, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import OrderDetailScreen from '../../screens/OrderDetailScreen';
import {useBasketContext} from '../../src/Contexts/BasketContext';
import {S3Image} from 'aws-amplify-react-native';
import {TextInput} from 'react-native-gesture-handler';
import {DataStore} from 'aws-amplify';
import {Restaurant} from '../../src/models';

const OrderListItem = ({order}) => {
  const {totalPrice} = useBasketContext();
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();
  const [rate, setRate] = useState('0');
  const onPress = () => {
    navigation.navigate('OrderDetailNavigator', {id: order.id});
  };
  const rating = parseFloat(
    (rate + order.Restaurant?.rating) / (order.Restaurant?.noOfRating + 1) / 10,
  );
  const onSubmit = async () => {
    // await DataStore.save(
    //   Restaurant.copyOf(order.Restaurant, updated => {
    //     updated.rating = parseFloat(rating),
    //     updated.noOfRating = parseInt(order.Restaurant?.noOfRating + 1),
    // }),
    // )
    await DataStore.save(
      Restaurant.copyOf(order.Restaurant, updated => {
        (updated.rating = parseFloat(rating)),
          (updated.noOfRating = parseInt(order.Restaurant?.noOfRating + 1));
      }),
    );
    setModal(false);
  };
  return (
    <Pressable
      onPress={onPress}
      style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
      {/* <Image
        source={{uri: order.Restaurant?.restaurantImage}}
        style={{width: 75, height: 75, marginRight: 5, borderRadius: 10}}
      /> */}
      <S3Image
        imgKey={order.Restaurant?.restaurantImage}
        style={{
          width: 75,
          height: 75,
          marginRight: 5,
          borderRadius: 10,
          flex: 1,
        }}
      />
      <View style={{marginHorizontal: 8, flex: 2}}>
        <Text
          style={{fontFamily: 'Fredoka-Medium', fontSize: 16, color: 'black'}}>
          {order.Restaurant?.restaurantName}
        </Text>
        <Text style={{marginVertical: 5, color: 'black'}}>
          {'\u20B9'}
          {order.total.toFixed(1)}
        </Text>
        <Text>{order.status} </Text>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{backgroundColor: '#af7ae6', borderRadius: 5}}
          onPress={() => setModal(true)}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Fredoka-Medium',
              fontSize: 14,
              alignSelf: 'center',
              marginHorizontal: 15,
              marginVertical: 10,
            }}>
            Rate It!
          </Text>
        </Pressable>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal(!modal);
        }}>
        <View style={{flex: 1}}>
          <Pressable
            style={{
              flex: 1,
              height: '30%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setModal(!modal)}></Pressable>
          <View
            style={{
              height: '40%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <View
              style={{
                margin: 20,
                height: '90%',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Fredoka-Regular',
                    alignSelf: 'center',
                    fontSize: 17,
                  }}>
                  Rate on the scale of 1 to 5
                </Text>
              </View>
              <TextInput
                value={rate}
                onChangeText={setRate}
                placeholder={'Rate'}
                style={{
                  height: 50,
                  backgroundColor: '#ededed',
                  marginVertical: 8,
                  fontSize: 20,
                  paddingHorizontal: 13,
                  borderRadius: 6,
                }}
              />
              <Pressable
                style={{backgroundColor: 'black', alignSelf: 'center'}}
                onPress={onSubmit}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Fredoka-Regular',
                    fontSize: 16,
                    marginHorizontal: 10,
                    alignSelf: 'center',
                    marginVertical: 5,
                  }}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={{
              flex: 1,
              height: '30%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setModal(!modal)}></Pressable>
        </View>
      </Modal>
    </Pressable>
  );
};

export default OrderListItem;
