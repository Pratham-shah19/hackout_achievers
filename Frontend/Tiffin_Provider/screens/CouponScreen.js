import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Coupons} from '../src/models';
import {DataStore} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Contexts/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import Offer from '../component/Offer';

const CouponScreen = () => {
  const {dbRestaurant, id} = useAuthContext();
  const [rcoupons, setRCoupons] = useState([]);
  const [uptoPrice, setUptoPrice] = useState('0');
  const [offerPercentage, setOfferPercentage] = useState('0');
  const navigation = useNavigation();
  const [scoupon, setSCoupon] = useState([]);
  useEffect(() => {
    DataStore.query(Coupons, coupon => coupon.restaurantID('eq', id)).then(
      setSCoupon,
    );
  }, []);

  const onSave = async () => {
    if (dbRestaurant) {
      await createCoupon();
      Alert.alert(
        'Coupon saved successfully, will get updated within few seconds',
      );
    }
  };

  const createCoupon = async () => {
    try {
      const newCoupon = await DataStore.save(
        new Coupons({
          uptoPrice: parseInt(uptoPrice),
          offerPercentage: parseInt(offerPercentage),
          restaurantID: id,
        }),
      );
      setRCoupons([...rcoupons, newCoupon]);
    } catch (err) {
      Alert.alert('ERROR');
    }
  };
  // useEffect(() => {
  //   DataStore.query(Coupons, id).then(setRCoupons);
  // }, []);
  return (
    <View style={{backgroundColor: 'white', padding: 10}}>
      <View style={{marginTop: 15}}>
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: 'black',
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Your Existing Coupons ({scoupon?.length})
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <FlatList
          // contentContainerStyle={{alignSelf: 'flex-start'}}
          // numColumns={Math.ceil(coupons?.length / 2)}
          // scrollEnabled={false}
          data={scoupon}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <Offer scoupon={item} />;
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name="ticket" size={20} color={'black'} />
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              fontSize: 18,
              marginHorizontal: 10,
            }}>
            Create New Coupons
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: 'grey',
            fontSize: 15,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 10,
          }}>
          (More no. of Coupons will help you to gain more customers
        </Text>
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 10,
          }}>
          Offer Percentage*
        </Text>
        <TextInput
          value={offerPercentage}
          onChangeText={setOfferPercentage}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Price upto which you want to give discount*
        </Text>
        <TextInput
          value={uptoPrice}
          onChangeText={setUptoPrice}
          style={styles.textinput}
        />
        <Pressable style={{marginTop: 20, marginBottom: 20}} onPress={onSave}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7442d',
              paddingVertical: 15,
              borderRadius: 7,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Fredoka-Medium',
                marginHorizontal: 110,
              }}>
              Save Coupon
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textinput: {
    height: 50,
    backgroundColor: '#f7f5f5',
    marginVertical: 8,
    fontSize: 15,
    paddingHorizontal: 13,
    borderRadius: 6,
    fontFamily: 'Fredoka-Regular',
    marginHorizontal: 10,
    color: 'grey',
  },
});

export default CouponScreen;
