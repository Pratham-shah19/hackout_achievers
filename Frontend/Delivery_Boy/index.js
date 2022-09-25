/**
 * @format
 */

import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
