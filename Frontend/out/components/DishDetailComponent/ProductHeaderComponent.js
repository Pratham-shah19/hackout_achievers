import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import RestaurantNearbyMeData from '../../data/RestaurantNearbyMeData.json';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ProductHeaderComponent = ({dish}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customizeVisible, setCustomizeVisible] = useState(false);
  const dishCustomize = RestaurantNearbyMeData[0].dishes[0];
  const [quantity, setQuantity] = useState(1);
  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  const getTotal = () => {
    return (dishCustomize.productPrice * quantity).toFixed(0);
  };
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
              <Entypo name="stopwatch" size={25} color={'blue'} />
              <Text style={{marginHorizontal: 7, color: 'black', fontSize: 16}}>
                50 mins
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="star" size={25} color={'yellow'} />
              <Text style={{marginHorizontal: 7, color: 'black', fontSize: 16}}>
                {dish.rating}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="leaf" size={25} color={'green'} />
              <Text
                style={{
                  marginHorizontal: 7,
                  color: 'black',
                  fontSize: 16,
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
        <View style={{marginHorizontal: 10, marginTop: 20}}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: 'Fredoka-Medium',
            }}>
            Customize
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          backgroundColor: '#a26bdb',
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 28,
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 19}}>
          Add Item - {'\u20B9'} {getTotal()}
        </Text>
      </View>
    </View>
  );
};

export default ProductHeaderComponent;
