import React, { Component } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Styles/LoginScreenStyles';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};  
  }

  componentWillMount() {

  }

  render() {
    
    return (
      <View style={styles.container}>
        <LinearGradient locations={[0.2,1]} colors={['#FF8C00','#FF3E96']} style={styles.container}>
        </LinearGradient>
      </View>
    );            
  }
}
