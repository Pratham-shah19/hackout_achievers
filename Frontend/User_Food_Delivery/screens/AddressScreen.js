import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {DataStore, Auth} from 'aws-amplify';
import {User} from '../src/models';
import GetLocation from 'react-native-get-location';

const AddressScreen = () => {
  const {dbUser} = useAuthContext();
  const [name, setName] = useState(dbUser?.name || '');
  const [flat_no, setFlat_no] = useState(dbUser?.flat_no + '' || '0');
  const [address, setAddress] = useState(dbUser?.address || '');
  const [city, setCity] = useState(dbUser?.city || '');
  const [pincode, setPincode] = useState(dbUser?.pincode + '' || '0');
  const [state, setState] = useState(dbUser?.state || '');
  const [location, setlocation] = useState(null);
  const {sub, setDbUser} = useAuthContext();

  const navigation = useNavigation();

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
    if (dbUser) {
      getLocation();
      await updateUser();
      navigation.goBack();
    } else {
      getLocation();
      await createUser();
    }
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, updated => {
        updated.name = name;
        updated.flat_no = parseInt(flat_no);
        updated.address = address;
        updated.city = city;
        updated.pincode = parseInt(pincode);
        updated.state = state;
        updated.lat = parseFloat(location.latitude);
        updated.lng = parseFloat(location.longitude);
      }),
    );
    setDbUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          flat_no: parseInt(flat_no),
          address,
          city,
          pincode: parseInt(pincode),
          state,
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
          sub,
        }),
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert('Error');
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
          {/* // onPress={() => {}}> */}
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
            Residential Address
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
          Name*
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={'Name'}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Flat No.*
        </Text>
        <TextInput
          value={flat_no}
          onChangeText={setFlat_no}
          placeholder={'Flat No./House No.'}
          style={styles.textinput}
          keyboardType={'numeric'}
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
          placeholder={'Address/Society name'}
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
          placeholder={'City'}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Pincode*
        </Text>
        <TextInput
          value={pincode}
          onChangeText={setPincode}
          placeholder={'Pincode'}
          style={styles.textinput}
          keyboardType={'numeric'}
          textContentType={'postalCode'}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          State*
        </Text>
        <TextInput
          value={state}
          onChangeText={setState}
          placeholder={'State'}
          style={styles.textinput}
        />
        {/* <View style={{marginBottom: 80}}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyA4mo5tDVFp1fq1aZHh-5cH-9xC6sruw2s',
              language: 'en',
            }}
          />
        </View> */}
      </View>
      <Pressable style={{marginTop: 20, marginBottom: 20}} onPress={onSave}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#af7ae6',
            paddingVertical: 15,
            borderRadius: 7,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontFamily: 'Fredoka-Medium',
              marginHorizontal: 100,
            }}>
            Save Address
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 8,
    fontSize: 15,
    paddingHorizontal: 13,
    borderRadius: 6,
    fontFamily: 'Fredoka-Regular',
    color: 'grey',
  },
});

export default AddressScreen;
