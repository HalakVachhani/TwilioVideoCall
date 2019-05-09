import EStyleSheets from 'react-native-extended-stylesheet';
import { Metrics, Colors } from '../../Themes';

export default EStyleSheets.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    textAlign: 'center',
    backgroundColor: Colors.snow
  },
  connectBtn: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenHeight * 0.05,
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  connectTxt: {
    color: Colors.snow        
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 250,
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  remoteVideo: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 120
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    marginVertical: 25,
    color: Colors.black,
    textAlign: 'center',
    width: Metrics.screenWidth * 0.7,
    alignSelf: 'center'
  }
});
