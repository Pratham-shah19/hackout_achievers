import React, {useState, useEffect} from 'react';
import {ScrollView, FlatList, StyleSheet, Text, View} from 'react-native';
import Offer from '../Offer';
import OfferData from '../../data/OfferData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Coupons} from '../../src/models';
import {DataStore} from 'aws-amplify';

const TopOffers = () => {
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    DataStore.query(Coupons).then(setCoupons);
  }, []);
  return (
    <View style={{marginVertical: 15, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          marginTop: 10,
        }}>
        <MaterialCommunityIcons name="sale" size={20} color="#8f58c7" />
        <Text style={styles.title}>Top Offers</Text>
      </View>
      <Text
        style={{
          color: 'gray',
          marginLeft: 10,
          marginTop: 5,
          fontFamily: 'Fredoka-Regular',
        }}>
        Big Savings On Your Loved Eateries
      </Text>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={Math.ceil(OfferData.length / 2)}
          scrollEnabled={false}
          data={coupons}
          renderItem={({item}) => {
            return <Offer coupon={item} />;
          }}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Fredoka-Medium',
    marginLeft: 3,
    color: 'black',
  },
});

export default TopOffers;
