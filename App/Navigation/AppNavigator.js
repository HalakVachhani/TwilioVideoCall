import { createStackNavigator } from 'react-navigation';
import TwilioVideoScreen from '../Containers/TwilioVideoScreen';

const AppNavigator = createStackNavigator({
  TwilioVideo: {
    screen: TwilioVideoScreen
  }
}, {
  headerMode: 'none'
});

export default AppNavigator;
