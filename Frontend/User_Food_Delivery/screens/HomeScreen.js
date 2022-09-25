import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import TopOffers from '../components/HomeScreenComponents/TopOffers';
import TopBrands from '../components/HomeScreenComponents/TopBrands';
import FamousItems from '../components/HomeScreenComponents/FamousItems';
import Coupons from '../components/HomeScreenComponents/Coupons';
import NearByRestaurants from '../components/HomeScreenComponents/NearByRestaurants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ImageCarousel from '../components/HomeScreenComponents/ImageCarousel';
import Header from '../components/HomeScreenComponents/Header';

const HomeScreen = () => {
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.filter}></View>

      <View>
        <ImageCarousel />
      </View>
      <View style={styles.topBrands}>
        <TopBrands />
      </View>
      <View style={styles.famousItems}>
        <FamousItems />
      </View>
      <View style={styles.topOffers}>
        <TopOffers />
      </View>
      <View style={styles.coupons}>
        <Coupons />
      </View>
      <View style={styles.restaurantsNearby}>
        <NearByRestaurants />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filter: {},
  mainfont: {
    fontWeight: 'bold',
  },
  banner: {
    height: '100%',
    width: '100%',
    borderRadius: 13,
  },
  freedeliveryPoster: {},
  topBrands: {},
  famousItems: {},
  topOffers: {},
  coupons: {},
  restaurantsNearby: {},
  container: {
    flex: 1,
  },
  bannerView: {
    height: 225,
    marginTop: 25,
    width: 335 % windowWidth,
    alignSelf: 'center',
    borderRadius: 17,
    margin: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default HomeScreen;
