import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './Navigation';
import AuthContextProvider from './src/Contexts/AuthContext';
import {Auth} from 'aws-amplify';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import OrderContextProvider from './src/Contexts/OrderContext';
import CreateNewDishScreen from './screens/CreateNewDishScreen';

Amplify.configure({...awsconfig, Analytics: {disabled: true}});

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AuthContextProvider>
        <OrderContextProvider>
          <Navigation />
        </OrderContextProvider>
      </AuthContextProvider>
    </View>
  );
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#f7442d',
    borderRadius: 6,
    // marginTop: 8,
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    fontFamily: 'Fredoka-Medium',
    fontSize: 15,
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    fontFamily: 'Fredoka-Medium',
    // color: 'grey',
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
    color: 'grey',
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    fontFamily: 'Fredoka-Medium',
    color: '#f7442d',
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
    color: 'grey',
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#f7442d',
    borderRadius: 6,
    // marginTop: 8,
  },
};

export default withAuthenticator(App, {theme: customTheme});
