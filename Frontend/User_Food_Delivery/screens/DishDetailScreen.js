import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RestaurantNearbyMeData from '../data/RestaurantNearbyMeData.json';
import {useRoute, useNavigation} from '@react-navigation/native';
// import BasketScreen from './BasketScreen';
import {Dish} from '../src/models';
import {DataStore} from 'aws-amplify';
import {useBasketContext} from '../src/Contexts/BasketContext';

// const dish = RestaurantNearbyMeData[0].dishes[0];
const DishDetailScreen = () => {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const {addDishToBasket} = useBasketContext();

  useEffect(() => {
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  };

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  const getTotal = () => {
    return (dish.productPrice * quantity).toFixed(0);
  };
  if (!dish) {
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
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={{height: 290}}>
          <Image
            source={{
              uri: dish.productImage,
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              marginTop: 20,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 23,
                  fontFamily: 'Fredoka-Medium',
                  alignSelf: 'center',
                }}>
                {dish.productName}😋
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 18,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="stopwatch" size={23} color={'#af7ae6'} />
              <Text style={{marginHorizontal: 7, color: 'black', fontSize: 14}}>
                50 mins
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="star" size={23} color={'orange'} />
              <Text style={{marginHorizontal: 7, color: 'black', fontSize: 14}}>
                {dish.productRating}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="leaf" size={23} color={'green'} />
              <Text
                style={{
                  marginHorizontal: 7,
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Fredoka-Regular',
                }}>
                Pure Veg.
              </Text>
            </View>
          </View>

          <View style={{margin: 15, marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                lineHeight: 20,
                fontFamily: 'Fredoka-Regular',
              }}>
              {dish.productDescription}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 120,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity style={{margin: 10}} onPress={onMinus}>
              <Text style={{color: 'gray', fontSize: 27}}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                margin: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#a26bdb',
                  fontSize: 23,
                  fontWeight: 'bold',
                }}>
                {quantity}
              </Text>
            </View>
            <TouchableOpacity style={{margin: 10}} onPress={onPlus}>
              <Text style={{color: 'gray', fontSize: 27}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          backgroundColor: '#a26bdb',
          borderRadius: 5,
          marginTop: 'auto',
          padding: 10,
          paddingHorizontal: 28,
          alignItems: 'center',
        }}
        onPress={onAddToBasket}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: 19,
            fontFamily: 'Fredoka-Regular',
          }}>
          ADD {quantity} item - {'\u20B9'} {getTotal()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DishDetailScreen;

{
  /* <FlatList
          ListHeaderComponent={() => (
            <ProductHeaderComponent dish={dishCustomize} />
          )}
          data={dishCustomize.customize}
          renderItem={({item}) => <CustomizeComponent customize={item} />}
        /> */
}
{
  /* <View style={{marginBottom: 50}}></View> */
}
