import {AppRegistry} from 'react-native';
import App from './src/components/app';
import {name as appName} from './app.json';

console.disableYellowBox = true;
console.ignoredYellowBox = ["Warning"];
AppRegistry.registerComponent(appName, () => App);