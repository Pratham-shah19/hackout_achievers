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
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {DataStore, Auth} from 'aws-amplify';
import {Courier, TransportationModes} from '../src/models';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GetLocation from 'react-native-get-location';

const AddressScreen = () => {
  const {dbCourier, sub, setDbCourier} = useAuthContext();
  const [name, setName] = useState(dbCourier?.name || '');
  const [transportationMode, setTransportationMode] = useState(
    TransportationModes.DRIVING,
  );
  const navigation = useNavigation();

  const [flat_no, setFlat_no] = useState(dbCourier?.flat_no + '' || '0');
  const [address, setAddress] = useState(dbCourier?.address || '');
  const [city, setCity] = useState(dbCourier?.city || '');
  const [pincode, setPincode] = useState(dbCourier?.pincode + '' || '0');
  const [state, setState] = useState(dbCourier?.state || '');
  const [location, setlocation] = useState(null);
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
    if (dbCourier) {
      getLocation();
      await updateCourier();
      navigation.goBack();
    } else {
      getLocation();
      await createCourier();
    }
  };

  const updateCourier = async () => {
    const courier = await DataStore.save(
      Courier.copyOf(dbCourier, updated => {
        updated.name = name;
        updated.flat_no = parseInt(flat_no);
        updated.address = address;
        updated.city = city;
        updated.pincode = parseInt(pincode);
        updated.state = state;
        updated.transportationMode = transportationMode;
        updated.lat = parseFloat(location.latitude);
        updated.lng = parseFloat(location.longitude);
      }),
    );
    setDbCourier(courier);
  };

  const createCourier = async () => {
    try {
      const courier = await DataStore.save(
        new Courier({
          name,
          flat_no: parseInt(flat_no),
          address,
          city,
          pincode: parseInt(pincode),
          state,
          sub,
          transportationMode,
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        }),
      );
      setDbCourier(courier);
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
              fontSize: 21,
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
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Flat no*
        </Text>
        <TextInput
          value={flat_no}
          onChangeText={setFlat_no}
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
          style={styles.textinput}
          keyboardType={'numeric'}
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
          style={styles.textinput}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Pressable
            onPress={() => setTransportationMode(TransportationModes.BICYCLING)}
            style={{
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
              backgroundColor:
                transportationMode === TransportationModes.BICYCLING
                  ? '#6fb5ed'
                  : 'white',
            }}>
            <FontAwesome5 name="bicycle" size={40} color={'black'} />
          </Pressable>
          <Pressable
            onPress={() => setTransportationMode(TransportationModes.DRIVING)}
            style={{
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
              backgroundColor:
                transportationMode === TransportationModes.DRIVING
                  ? '#6fb5ed'
                  : 'white',
            }}>
            <FontAwesome5 name="motorcycle" size={40} color={'black'} />
          </Pressable>
        </View>
      </View>
      <Pressable style={{marginTop: 20, marginBottom: 20}} onPress={onSave}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4f81ff',
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
