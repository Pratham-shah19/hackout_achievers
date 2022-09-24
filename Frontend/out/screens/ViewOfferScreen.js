import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DataStore} from 'aws-amplify';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Restaurant, Coupons} from '../src/models';
import Offer from '../components/Offer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ViewOfferScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params;

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Coupons, coupon => coupon.restaurantID('eq', id)).then(
      setRestaurant,
    );
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
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons name="party-popper" size={22} color={'black'} />
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: 'Fredoka-Regular',
            marginHorizontal: 5,
          }}>
          Top Offers by this Restaurant!
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <FlatList
          data={restaurant}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <Offer coupon={item} />;
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default ViewOfferScreen;
