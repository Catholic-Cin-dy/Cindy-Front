/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
//import App from './App';
import App from './src/NewApp';
import {name as appName} from './app.json';

//Ignore all log notifications
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
