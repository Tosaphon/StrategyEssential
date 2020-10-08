import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      isLoaded:false
    };
  }

  componentDidMount() {
    this.navigateTo()
  }

  async navigateTo() {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'MobileRootStack' }
        ],
      })
    );
  }

  render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Splash Screen</Text>
          {/* <Image
            style={{ width: '50%' }}
            source={require('../../images/ssup-logo.png')}
            resizeMode="contain"
          /> */}
        </View>
      );
  }
}

export default SplashScreen;
