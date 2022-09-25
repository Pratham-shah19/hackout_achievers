import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import {View, Text} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OrderDeliveryScreen from './screens/OrderDeliveryScreen';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigation';
import {enableLatestRenderer} from 'react-native-maps';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import AuthContextProvider from './src/Contexts/AuthContext';
import OrderContextProvider from './src/Contexts/OrderContext';

Amplify.configure({...awsconfig, Analytics: {disabled: true}});

enableLatestRenderer();

const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthContextProvider>
          <OrderContextProvider>
            <View style={{flex: 1}}>
              <Navigation />
            </View>
          </OrderContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#4f81ff',
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    fontFamily: 'Fredoka-Medium',
    fontSize: 15,
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    fontFamily: 'Fredoka-Medium',
  },
  input: {
    ...AmplifyTheme.input,
    fontFamily: 'Fredoka-Medium',
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: '#f7f7f7',
  },
  inputLabel: {
    ...AmplifyTheme.inputLabel,
    fontFamily: 'Fredoka-Medium',
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    fontFamily: 'Fredoka-Medium',
    color: '#4f81ff',
  },
  phoneContainer: {
    ...AmplifyTheme.phoneContainer,
    fontFamily: 'Fredoka-Medium',
    borderWidth: 0,
    borderRadius: 6,
  },
  phoneInput: {
    ...AmplifyTheme.phoneInput,
    fontFamily: 'Fredoka-Medium',
    borderWidth: 0,
    backgroundColor: '#f7f7f7',
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#4f81ff',
    borderRadius: 6,
    marginTop: 8,
  },
};

export default withAuthenticator(App, {theme: customTheme});
