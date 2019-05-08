import EStyleSheets from 'react-native-extended-stylesheet';
import { Metrics } from '../../Themes';

export default EStyleSheets.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight  
  },
  shadowBg: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight 
  }
});
