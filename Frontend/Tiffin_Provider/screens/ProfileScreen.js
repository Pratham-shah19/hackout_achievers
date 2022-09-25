import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {S3Image} from 'aws-amplify-react-native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {dbRestaurant} = useAuthContext();
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 25,
            marginLeft: 15,
          }}>
          <View>
            {/* <Image
              source={{
                uri: dbRestaurant.restuarantImage,
              }}
              style={{height: 100, width: 100, borderRadius: 50}}
            /> */}
            <S3Image
              imgKey={dbRestaurant.restaurantImage}
              style={{height: 100, width: 100, borderRadius: 50}}
            />
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Fredoka-Medium',
                color: 'black',
                marginTop: 10,
              }}>
              {dbRestaurant.restaurantName}
            </Text>
            <Text
              style={{
                marginRight: 10,
                fontSize: 15,
                fontFamily: 'Fredoka-Regular',
                color: 'black',
              }}>
              {dbRestaurant.address}
            </Text>
          </View>
        </View>

        {/* <Ionicons name="star-outline" size={30} color="#8f58c7" /> */}

        {/* <Text style={styles.textcolour}>Your Rating</Text> */}

        <View style={{marginHorizontal: 18, marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Fredoka-Medium',
              fontSize: 17,
              marginBottom: 8,
              color: 'black',
            }}>
            Order Details
          </Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('RestaurantDetailScreen')}>
            <MaterialCommunityIcons
              name="home-city-outline"
              size={24}
              color="#f7442d"
            />
            <Text style={styles.textcolour}>Edit Restaurant Details</Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('History')}>
            <Octicons name="checklist" size={22} color={'#f7442d'} />
            <Text style={styles.textcolour}>History</Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('AddImageScreen')}>
            <Entypo name="image-inverted" size={24} color="#f7442d" />
            <Text style={styles.textcolour}>Add Images</Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <MaterialIcons name="book-online" size={24} color="#f7442d" />
            <Text style={styles.textcolour}>Report An Issue</Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#f7442d"
            />
            <Text style={styles.textcolour}>About</Text>
          </Pressable>
        </View>

        <View style={{marginHorizontal: 10, marginTop: 10}}>
          <Pressable>
            <Text style={styles.textcolour}>Give Feedback</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.textcolour}>Rate Us On PlayStore</Text>
          </Pressable>
          <TouchableOpacity
            style={{
              backgroundColor: '#f7442d',
              borderRadius: 5,
              marginTop: 20,
              padding: 10,
              paddingHorizontal: 28,
              alignItems: 'center',
              shadowColor: '#f7442d',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}
            onPress={() => Auth.signOut()}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 17,
                fontFamily: 'Fredoka-Medium',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textcolour: {
    fontSize: 15,
    color: '#4d4d4d',
    marginBottom: 7,
    marginTop: 5,
    marginHorizontal: 10,
    fontFamily: 'Fredoka-Regular',
  },
  like: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'Fredoka-Regular',
  },
  likr1: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'black',
  },
});

export default ProfileScreen;
