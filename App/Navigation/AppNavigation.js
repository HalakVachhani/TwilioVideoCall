import { createStackNavigator, createAppContainer } from 'react-navigation';
// import LaunchScreen from '../Containers/LaunchScreen';
import LoginScreen from '../Containers/LoginScreen';
import TwilioVideoScreen from '../Containers/TwilioVideoScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  // LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen },
  TwilioVideoScreen: { screen: TwilioVideoScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TwilioVideoScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
});

export default createAppContainer(PrimaryNav);
