import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {DataStore, Storage} from 'aws-amplify';
import {Restaurant} from '../src/models';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {S3Image} from 'aws-amplify-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AddressScreen = () => {
  const {dbRestaurant, sub, setDbRestaurant} = useAuthContext();
  const navigation = useNavigation();
  const [restaurantName, setRestaurantName] = useState(
    dbRestaurant?.restaurantName || '',
  );
  const [restaurantImage, setRestaurantImage] = useState(
    dbRestaurant?.restaurantImage || '',
  );
  const [deliveryFee, setDeliveryFee] = useState(
    dbRestaurant?.deliveryFee + '' || '0',
  );
  const [timeToDeliver, setTimeToDeliver] = useState(
    dbRestaurant?.timeToDeliver + '' || '0',
  );
  const [rating, setRating] = useState(dbRestaurant?.rating + '' || '0');
  const [address, setAddress] = useState(dbRestaurant?.address || '');
  const [category, setCategory] = useState(dbRestaurant?.category || '');
  const [city, setCity] = useState(dbRestaurant?.city || '');
  const [area, setArea] = useState(dbRestaurant?.area || '');
  const [location, setlocation] = useState(null);
  const [image, setImage] = useState(null);
  const [fimage, setFimage] = useState(null);
  const [noOfRating, setNoOfRating] = useState('0');

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const libraryResponse =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
  //       if (
  //         libraryResponse.status !== 'granted' ||
  //         photoResponse.status !== 'granted'
  //       ) {
  //         alert('Sorry we need permissions');
  //       }
  //     }
  //   })();
  // }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const getImage = async () => {
    if (!image) {
      return null;
    }
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
  };

  const sendImage = async () => {
    const blob = await getImage();
    const result = await Storage.put(`${uuidv4()}.png`, blob);
    setFimage(result.key);
    Alert.alert('Image uploaded');
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(responseJson => {
        var location = responseJson;
        setlocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const onSave = async () => {
    if (dbRestaurant) {
      getLocation();
      await updateRestaurant();
      navigation.goBack();
    } else {
      getLocation();
      await createRestaurant();
    }
  };

  const updateRestaurant = async () => {
    const restaurant = await DataStore.save(
      Restaurant.copyOf(dbRestaurant, updated => {
        updated.restaurantName = restaurantName;
        updated.restaurantImage = fimage;
        updated.deliveryFee = parseFloat(deliveryFee);
        updated.timeToDeliver = parseInt(timeToDeliver);
        updated.address = address;
        updated.lat = parseFloat(location?.latitude);
        updated.lng = parseFloat(location?.longitude);
        updated.category = category;
        updated.city = city;
        updated.area = area;
      }),
    );
    setDbRestaurant(restaurant);
  };

  const createRestaurant = async () => {
    try {
      const restaurant = await DataStore.save(
        new Restaurant({
          sub,
          restaurantName,
          restaurantImage: fimage,
          deliveryFee: parseFloat(deliveryFee),
          timeToDeliver: parseInt(timeToDeliver),
          rating: parseFloat(0),
          noOfRating: parseInt(0),
          address,
          lat: parseFloat(location?.latitude),
          lng: parseFloat(location?.longitude),
          category,
          city,
          area,
        }),
      );
      setDbRestaurant(restaurant);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <ScrollView
      style={{padding: 15, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 7,
            left: -5,
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
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
            marginBottom: 15,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Fredoka-Medium',
              color: 'black',
            }}>
            Restaurant Address
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Restaurant Name*
        </Text>
        <TextInput
          value={restaurantName}
          onChangeText={setRestaurantName}
          style={styles.textinput}
        />
        {/* <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Restaurant Image*
        </Text>
        <TextInput
          value={restaurantImage}
          onChangeText={setRestaurantImage}
          placeholder={'Restaurant Image URL'}
          style={styles.textinput}
        /> */}
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Upload Restaurant Image*
        </Text>
        <View style={{marginTop: 9, marginBottom: 5}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pressable
              style={{backgroundColor: 'white', borderRadius: 8}}
              onPress={pickImage}>
              <Text
                style={{
                  fontFamily: 'Fredoka-Regular',
                  color: '#f7442d',
                  fontSize: 15,
                  margin: 4,
                  marginHorizontal: 25,
                  marginVertical: 10,
                }}>
                Select Image
              </Text>
            </Pressable>
            <Pressable
              onPress={sendImage}
              style={{backgroundColor: '#f7442d', borderRadius: 8}}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Fredoka-Regular',
                    marginHorizontal: 15,
                    marginVertical: 10,
                  }}>
                  Upload
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Delivery Fee*
        </Text>
        <TextInput
          value={deliveryFee}
          onChangeText={setDeliveryFee}
          style={styles.textinput}
          keyboardType={'numeric'}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Time to Deliver*
        </Text>
        <TextInput
          value={timeToDeliver}
          onChangeText={setTimeToDeliver}
          style={styles.textinput}
          keyboardType={'numeric'}
        />
        {/* <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          No. of Rating*
        </Text>
        <TextInput
          value={noOfRating}
          onChangeText={setNoOfRating}
          placeholder={'Rating'}
          style={styles.textinput}
          keyboardType={'numeric'}
        /> */}
        {/* <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Rating*
        </Text>
        <TextInput
          value={rating}
          onChangeText={setRating}
          placeholder={'Rating'}
          style={styles.textinput}
          keyboardType={'numeric'}
        /> */}
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Category*
        </Text>
        <TextInput
          value={category}
          onChangeText={setCategory}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Address*
        </Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Area*
        </Text>
        <TextInput
          value={area}
          onChangeText={setArea}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          City*
        </Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          style={styles.textinput}
        />
      </View>
      <Pressable style={{marginTop: 20, marginBottom: 20}} onPress={onSave}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f7442d',
            paddingVertical: 15,
            borderRadius: 7,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontFamily: 'Fredoka-Medium',
              marginHorizontal: 100,
            }}>
            Save Details
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    height: 50,
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
    fontSize: 15,
    paddingHorizontal: 13,
    borderRadius: 6,
    fontFamily: 'Fredoka-Regular',
    color: 'grey',
  },
});

export default AddressScreen;
