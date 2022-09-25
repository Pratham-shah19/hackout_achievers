import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductScreenComponent from '../components/ProductScreenComponent';
import HeaderComponent from '../components/ProductScreenComponent/HeaderComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DataStore} from 'aws-amplify';
import {Restaurant, Dish} from '../src/models';
import {useBasketContext} from '../src/Contexts/BasketContext';
import {useAuthContext} from '../src/Contexts/AuthContext';

const ProductScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const {
    setRestaurant: setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketRestaurant(null);

    DataStore.query(Restaurant, id).then(setRestaurant);

    DataStore.query(Dish, dish => dish.restaurantID('eq', id)).then(setDishes);
  }, [id]);

  useEffect(() => {
    setBasketRestaurant(restaurant);
  }, [restaurant]);

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
    <View>
      <FlatList
        ListHeaderComponent={() => <HeaderComponent restaurant={restaurant} />}
        data={dishes}
        renderItem={({item}) => <ProductScreenComponent dish={item} />}
        keyExtractor={item => item.productName}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 7,
          left: 10,
          width: 35,
          height: 35,
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}>
        {/* // onPress={console.log(id)}> */}
        <Entypo name="chevron-left" size={28} color={'black'} />
      </TouchableOpacity>
      {basket && (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            backgroundColor: '#a26bdb',
            borderRadius: 5,
            position: 'absolute',
            top: 629,
            padding: 10,
            paddingHorizontal: 28,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('BasketScreen')}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 17,
              fontFamily: 'Fredoka-Regular',
              marginHorizontal: 80,
            }}>
            Open Basket ({basketDishes.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductScreen;
