import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../../BaseView/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import BaseComponent from "../../../Utility/BaseComponent";
const { width, height } = Dimensions.get('screen')
const boxWidth = width * 3 / 4

class Signin extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  // renderHeader() {
  //   return (
  //     <View style={{
  //       // flex: 1,
  //       width: width,
  //       justifyContent: 'center',
  //       backgroundColor: 'blue',
  //     }}>
  //       <SafeAreaView style={{
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //       }}>
  //         <Ionicons style={{}} name="chevron-back" color='white' size={26} />
  //         <Text style={[Styles.title, {}]}>TITLE</Text>
  //       </SafeAreaView>
  //     </View>
  //   )
  // }

  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.emit('onBoardingIndicator', {
        index: 4,
      });
    });
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  validateEmail() {
    console.log("valid")
  }
  
  validatePassword() {
    console.log("valid")
  }

  async signin() {
    await AsyncStorage.setItem('token', 'test')
    this.props.navigation.navigate('ConsentsScreen')
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.renderHeader("")}
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View style={ScreenStyles.container}>
            <View style={[Styles.textInputView, { marginTop: 40 }]}>
              <TextInput
                placeholder="Email or phone number"
                style={[Styles.title, Styles.textInput, { height: 32, width: boxWidth - 48 }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='email-address'
                onBlur={() => {
                  this.validateEmail()
                }}
                onChangeText={async text => {
                  await this.setState({ usename: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <View style={[Styles.textInputView, Styles.textInput]}>
              <TextInput
                placeholder="Password"
                style={[Styles.title, Styles.textInput, { height: 32, width: boxWidth - 48 }]}
                secureTextEntry={true}
                allowFontScaling={false}
                value={this.state.passwrod}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType="default"
                onBlur={() => {
                  this.validatePassword()
                }}
                onChangeText={async text => {
                  await this.setState({ password: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.signin()
              }}
            >
              <View style={[
                Styles.textInputView,
                {
                  backgroundColor: '#dfb445',
                  justifyContent: 'center'
                }]}>
                <Text style={[Styles.title]}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("RegistrationScreen")

              }}
            >
              <View style={[
                Styles.textInputView,
                {
                  marginTop: -4,
                  backgroundColor: 'transparent',
                  justifyContent: 'center'
                }]}>
                <Text style={[Styles.title]}>Register</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: boxWidth }}>
              <TouchableOpacity
                onPress={() => { }}
              >
                <Text style={Styles.title}>
                  Forgot password?
              </Text>
              </TouchableOpacity>
            </View>
            <Text style={Styles.title}>
              OR
              </Text>
            <GoogleSigninButton
              style={{ width: boxWidth, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn()}
              disabled={this.state.isSigninInProgress} />
            <View style={{ width: boxWidth }}>
            </View>
            <Text style={[Styles.title, { width: boxWidth, textAlign: 'center' }]}>
              Creating an account means you’re okay with
              Strategy Essential’s
                <Text style={[Styles.title, { color: 'gray' }]}
                onPress={() => {
                  console.log("pressed")
                }}
              >
                {' '}Term of Service, Privacy Policy
              </Text>
            </Text>
          </View>
        </ScrollView>
        {this.renderLoadingView(this.state.isLoading)}
      </View>
    );
  }
}

const ScreenStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },

  headerTitle: {
    color: 'white',
    fontSize: 20
  }
})


export default Signin;
