import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import Router from './Router';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import AuthContextProvider from './src/Contexts/AuthContext';
import BasketContextProvider from './src/Contexts/BasketContext';
import OrderContextProvider from './src/Contexts/OrderContext';
import {enableLatestRenderer} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {StripeProvider} from '@stripe/stripe-react-native';

Amplify.configure({...config, Analytics: {disabled: true}});
enableLatestRenderer();

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthContextProvider>
          <BasketContextProvider>
            <OrderContextProvider>
              {/* <StripeProvider publishableKey="pk_live_51KyqwvSFXhJBixXAkcyirlXABSuwuQoC9a6daIFPkc7mrRotk18Xe1eISkB7tFR1krgUbuw8FY6SQxvmTx9ZZ89100S4jkwTWc"> */}
              <Router />
              {/* </StripeProvider> */}
            </OrderContextProvider>
          </BasketContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </View>
  );
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: '#af7ae6',
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
    color: 'grey',
  },
  input: {
    ...AmplifyTheme.input,
    fontFamily: 'Fredoka-Medium',
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  inputLabel: {
    ...AmplifyTheme.inputLabel,
    fontFamily: 'Fredoka-Medium',
    color: 'grey',
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    fontFamily: 'Fredoka-Medium',
    color: '#af7ae6',
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
    backgroundColor: '#f0f0f0',
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#af7ae6',
    borderRadius: 6,
    marginTop: 8,
  },
};
export default withAuthenticator(App, {theme: customTheme});
