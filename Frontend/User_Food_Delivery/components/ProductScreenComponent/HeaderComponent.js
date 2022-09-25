import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchComponent from './SearchComponent';
import {useNavigation} from '@react-navigation/native';
import {DataStore} from 'aws-amplify';
import {Favourites} from '../../src/models';
import {useAuthContext} from '../../src/Contexts/AuthContext';

const HeaderComponent = ({restaurant}) => {
  const [Like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();
  const [cf, setCf] = useState(null);
  const {id} = useAuthContext();
  const agregarFavoritos = async () => {
    setLike(!Like);

    try {
      const favourite = await DataStore.save(
        new Favourites({userID: id, Restaurant: restaurant, yesOrno: 'YES'}),
      );
      setCf(favourite);
    } catch (err) {
      Alert.alert('Error');
    }
  };
  const DEFAULT_IMAGE =
    'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Waagmi_Soni/Gralic_Crust_Veggie_Pizza.jpg';
  return (
    <View style={{padding: 10, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* <View style={{}}>
          <Entypo name="chevron-left" size={28} color={'black'} />
        </View> */}
        <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
          <TouchableOpacity
            style={{marginHorizontal: 7}}
            onPress={agregarFavoritos}>
            <AntDesign
              name={Like ? 'heart' : 'hearto'}
              size={21}
              color={Like ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <View style={{marginHorizontal: 7}}>
            <FontAwesome5 name="share-alt" size={21} color={'black'} />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View>
          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 21,
                color: 'black',
                fontFamily: 'Fredoka-Medium',
              }}>
              {restaurant.restaurantName}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                marginTop: 3,
                fontFamily: 'Fredoka-Regular',
              }}>
              {restaurant.category}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 10,
            width: '17%',
            height: '74%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 42,
          }}
          onPress={() => setModal(true)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#af7ae6',
                marginRight: 3,
              }}>
              {restaurant.rating}
            </Text>
            <FontAwesome name="star" size={12} color={'#af7ae6'} />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: '#af7ae6',
                fontSize: 10,
                alignSelf: 'center',
                fontFamily: 'Fredoka-Medium',
              }}>
              Delivery
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: '#545454',
              fontSize: 13,
              marginTop: 3,
              fontFamily: 'Fredoka-Regular',
            }}>
            {restaurant.area}, {restaurant.city} | 3 km
          </Text>
          <View style={{height: 10}}></View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RestaurantImages', restaurant.id)
          }>
          <ImageBackground
            source={{
              uri: restaurant.restaurantImage.startsWith('http')
                ? restaurant.restaurantImage
                : DEFAULT_IMAGE,
            }}
            imageStyle={{opacity: 0.7, borderRadius: 10}}
            resizeMode={'cover'}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 100)',
              borderRadius: 10,
              width: 64,
              height: 44,
              padding: 6,
            }}>
            <Text
              style={{
                color: 'white',
                marginRight: 3,
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              8
            </Text>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  alignSelf: 'center',
                  fontFamily: 'Fredoka-SemiBold',
                }}>
                PHOTOS
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <SearchComponent restaurant={restaurant} />
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
              height: '35%',
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
                    fontSize: 20,
                  }}>
                  Ratings
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                {[0, 0, 0, 0, 0].map((el, i) => (
                  <FontAwesome
                    style={{margin: 0.5}}
                    name={i < Math.floor(restaurant.rating) ? 'star' : 'star-o'}
                    size={44}
                    color={'#fabe1b'}
                  />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 30,
                  color: 'black',
                  marginHorizontal: 11,
                  marginTop: 10,
                }}>
                {restaurant.noOfRating}
              </Text>
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
    </View>
  );
};

export default HeaderComponent;
