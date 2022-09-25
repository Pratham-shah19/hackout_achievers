import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Restaurant} from '../src/models';
import {DataStore} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const RestaurantImages = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const DEFAULT_IMAGE =
    'https://1.bp.blogspot.com/-TpcaYPMoPQA/XpUHg5CtxZI/AAAAAAAAQb4/nrDJBredr-cVBbzqUI052zVBPSvW4wTiACLcBGAsYHQ/s1600/20200413_170716%2B%25281%2529.jpg';

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Restaurant, id).then(setRestaurant);
  }, [id]);
  if (!restaurant) {
    return (
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator color={'violet'} size={'large'} />
      </View>
    );
  }
  return (
    <ScrollView style={{backgroundColor: 'white', padding: 10, flex: 1}}>
      <View style={{alignContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={28} color={'black'} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Fredoka-Regular',
              fontSize: 20,
            }}>
            Restaurant Images
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={{uri: restaurant?.image1 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={{uri: restaurant?.image2 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={{uri: restaurant?.image3 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={{uri: restaurant?.image4 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={{uri: restaurant?.image5 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={{uri: restaurant?.image6 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Image
            source={{uri: restaurant?.image7 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={{uri: restaurant?.image8 || DEFAULT_IMAGE}}
            style={{
              height: 165,
              width: 165,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RestaurantImages;
