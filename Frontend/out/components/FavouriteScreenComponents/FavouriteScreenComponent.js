import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {S3Image} from 'aws-amplify-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {Favourites} from '../../src/models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DataStore} from 'aws-amplify';

const FavouriteScreenComponent = ({favourite}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ProductScreen', {id: favourite.Restaurant?.id});
  };
  const onDelete = async () => {
    const todelete = await DataStore.query(Favourites, favourite.id);
    DataStore.delete(todelete);
  };
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          marginVertical: 10,
          backgroundColor: 'white',
        }}>
        <View style={{flex: 2, alignContent: 'center'}}>
          <S3Image
            imgKey={favourite.Restaurant?.restaurantImage}
            style={{
              height: 100,
              width: 90,
              alignSelf: 'center',
              borderRadius: 10,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              borderRadius: 5,
              top: '73%',
              left: '19%',
              backgroundColor: 'white',
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#8f58c7', fontWeight: 'bold', fontSize: 13}}>
              60% OFF
            </Text>
            <Text style={{color: '#8f58c7', fontSize: 10}}>
              Upto {'\u20B9'}125
            </Text>
          </View>
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <View>
            <Text
              style={{
                fontFamily: 'Fredoka-Medium',
                color: 'black',
                fontSize: 15,
              }}>
              {favourite.Restaurant?.restaurantName}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="star" size={15} color="#666563" />
              <Text
                style={{
                  color: '#666563',
                  fontSize: 12,
                  marginLeft: 4,
                  fontWeight: 'bold',
                }}>
                {favourite.Restaurant?.rating}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 8,
                  color: '#666563',
                  marginLeft: 6,
                  fontWeight: 'bold',
                }}>
                .
              </Text>
              <Text
                style={{
                  color: '#666563',
                  fontSize: 12,
                  marginLeft: 8,
                  fontWeight: 'bold',
                }}>
                {favourite.Restaurant?.timeToDeliver} mins
              </Text>
              <Text
                style={{
                  marginBottom: 8,
                  color: '#666563',
                  marginLeft: 6,
                  fontWeight: 'bold',
                }}>
                .
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: 'gray',
                fontFamily: 'Fredoka-Regular',
                fontSize: 13,
              }}>
              {favourite.Restaurant?.category}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              flex: 1,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onDelete}>
            <MaterialIcons name="delete" size={25} color={'#878787'} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default FavouriteScreenComponent;
