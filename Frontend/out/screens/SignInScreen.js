import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useAuthContext} from '../src/Contexts/AuthContext';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const {dbStudent} = useAuthContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }
  };

  //   setLoading(true);
  //   try {
  //     const response = await Auth.signIn(data.username, data.password);
  //     // console.log(response);
  //     if (!dbStudent) {
  //       setTimeout(() => {
  //         navigation.navigate('Register');
  //       }, 2000);
  //     }
  //   } catch (e) {
  //     Alert.alert('Oops', e.message);
  //   }
  //   setLoading(false);
  // };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const onSignUpPress = () => {
    navigation.navigate('Register');
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
            Sign In
          </Text>
        </View>
      </View>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{required: 'Email is required'}}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password should be minimum 3 characters long',
          },
        }}
      />

      <CustomButton
        text={loading ? 'Loading...' : 'Sign In'}
        onPress={handleSubmit(onSignInPressed)}
      />

      <CustomButton
        text="Forgot password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      {/* <SocialSignInButtons /> */}

      <CustomButton
        text="Don't have an account? Create one"
        onPress={onSignUpPress}
        type="TERTIARY"
      />
    </ScrollView>
  );
};

export default SignInScreen;
