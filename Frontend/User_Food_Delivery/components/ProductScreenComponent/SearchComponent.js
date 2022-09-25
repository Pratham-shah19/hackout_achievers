import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';

const SearchComponent = ({restaurant}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 10, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 10,
              borderRadius: 19,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
            <Fontisto name="motorcycle" size={18} color={'black'} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                letterSpacing: 1,
                fontSize: 11,
                color: 'black',
                fontFamily: 'Fredoka-Regular',
              }}>
              MODE
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: 'black',
                fontFamily: 'Fredoka-Medium',
              }}>
              delivery
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              padding: 10,
              borderRadius: 19,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
            <Entypo name="stopwatch" size={18} color={'black'} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                letterSpacing: 1,
                fontSize: 11,
                color: 'black',
                fontFamily: 'Fredoka-Regular',
              }}>
              TIME
            </Text>
            <Text style={{fontSize: 11, color: 'black', fontWeight: '500'}}>
              {restaurant.timeToDeliver} mins
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('ViewOfferScreen', restaurant.id)}>
          <View
            style={{
              padding: 10,
              borderRadius: 19,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            }}>
            <Fontisto name="shopping-sale" size={18} color={'#2c59c9'} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                letterSpacing: 1,
                fontSize: 11,
                color: 'black',
                fontFamily: 'Fredoka-Regular',
              }}>
              OFFERS
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: 'black',
                fontFamily: 'Fredoka-Medium',
              }}>
              view all (1)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#ededed',
          margin: 10,
          borderRadius: 12,
          height: 44,
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
        <View style={{}}>
          <FontAwesome name="motorcycle" size={16} color={'#079135'} />
        </View>
        <View style={{marginHorizontal: 8}}>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Fredoka-Regular',
            }}>
            Free delivery
          </Text>
        </View>
      </View>

      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color="#af7ae6"
        />
        <TextInput
          style={styles.input}
          placeholder="Search within menu"
          underlineColorAndroid="transparent"
          placeholderTextColor={'grey'}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Fredoka-Medium',
          color: 'black',
          marginHorizontal: 8,
          marginVertical: 10,
        }}>
        Recommended For You 😉
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginHorizontal: 12,
  },
  searchIcon: {
    padding: 7,
  },
  input: {
    flex: 1,
    paddingLeft: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#424242',
    fontFamily: 'Fredoka-Regular',
  },
});

export default SearchComponent;
