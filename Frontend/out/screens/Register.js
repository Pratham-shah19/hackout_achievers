import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Contexts/AuthContext';
// import CustomInput from '../../component/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';

// import SocialSignInButtons from '../component/SocialSignInButtons';

import {useForm} from 'react-hook-form';
import {DataStore, Auth} from 'aws-amplify';
import {User} from '../src/models';
import GetLocation from 'react-native-get-location';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const AddressScreen = () => {
  // const {dbUser} = useAuthContext();
  // const {sub, setDbUser} = useAuthContext();

  // const navigation = useNavigation();

  // const getLocation = () => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(responseJson => {
  //       var location = responseJson;
  //       setlocation(location);
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });
  // };

  // const onSave = async () => {
  //   if (dbUser) {
  //     getLocation();
  //     await updateUser();
  //     navigation.goBack();
  //   } else {
  //     getLocation();
  //     await createUser();
  //   }
  // };

  // const updateUser = async () => {
  //   const user = await DataStore.save(
  //     User.copyOf(dbUser, updated => {
  //       updated.name = name;
  //       updated.flat_no = parseInt(flat_no);
  //       updated.address = address;
  //       updated.city = city;
  //       updated.pincode = parseInt(pincode);
  //       updated.state = state;
  //       updated.lat = parseFloat(location.latitude);
  //       updated.lng = parseFloat(location.longitude);
  //     }),
  //   );
  //   setDbUser(user);
  // };

  // const createUser = async () => {
  //   try {
  //     const user = await DataStore.save(
  //       new User({
  //         name,
  //         flat_no: parseInt(flat_no),
  //         address,
  //         city,
  //         pincode: parseInt(pincode),
  //         state,
  //         lat: parseFloat(location.latitude),
  //         lng: parseFloat(location.longitude),
  //         sub,
  //       }),
  //     );
  //     setDbUser(user);
  //   } catch (e) {
  //     Alert.alert('Error');
  //   }
  // };
  // #f25252
  const {height} = useWindowDimensions();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {password, email, name, flatNo, city, state} = data;
    // try {
    //   await Auth.signUp({
    //     username,
    //     password,
    //     attributes: {email, name, preferred_username: username},
    //   });

    //   navigation.navigate('ConfirmEmail', {username});
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
  };

  return (
    <ScrollView
      style={{padding: 15, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../data/herself.jpeg')}
          style={{height: 130, width: 130, borderRadius: 65}}
        />
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
            Sign Up
          </Text>
        </View>
      </View>
      <View>
        <CustomInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="flatNo"
          control={control}
          placeholder="Flat No."
          rules={{
            required: 'Flat No. is required',
            minLength: {
              value: 3,
              message: 'Flat No. should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Flat No. should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="city"
          control={control}
          placeholder="City"
          rules={{
            required: 'City is required',
            minLength: {
              value: 3,
              message: 'City should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'City should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="state"
          control={control}
          placeholder="State"
          rules={{
            required: 'State is required',
            minLength: {
              value: 3,
              message: 'State should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'State should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="confirm-password"
          control={control}
          placeholder="Confirm Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />
      </View>
      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
      <Pressable
        style={{alignContent: 'center', alignItems: 'center'}}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}>
        <Text style={{alignSelf: 'center'}}>Already existing user? Login</Text>
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
