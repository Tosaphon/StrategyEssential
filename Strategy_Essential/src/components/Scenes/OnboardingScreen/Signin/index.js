import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Styles from '../../../BaseView/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { authentication } from '../../../BaseView/Service'

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
      isLoading: false,
      email: '',
      password: '',
      isPasswordValid: true,
      isShowPassword: false,
      isLoading: false
    };
  }

  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.emit('onBoardingIndicator', {
        index: 4,
      });
    });
  }

  handleSignIn = async (result) => {
    if (result.isError) {
      this.showAlert(result.response)
    } else {
      await this.navigateToNextScreen()
      this.setState({ isLoading: false })
    }
  }

  showAlert = (error) => {
    let userError = error.response.data
    let subTitleError = userError.name + " (" + userError.statusCode + ")"
    console.log(userError);
    Alert.alert(userError.message, subTitleError,
      [
        {
          text: global.l10n.errorLoginOkButtonTitle,
          onPress: () => { this.setState({ isLoading: false }) },
          style: 'cancel'
        }
      ]
    )
  }

  navigateToNextScreen = async () => {
    console.log('navigate')
    let isConsentStr = await AsyncStorage.getItem('isConsent')
    let isConsent = await JSON.parse(isConsentStr)
    if (isConsent) {
      await AsyncStorage.setItem("isConsent", "true")
      await AsyncStorage.setItem("isMember", "true")
      DeviceEventEmitter.emit('updateRootView');
      console.log("emit updateRootView")
    } else {
      this.props.navigation.navigate('ConsentsScreen')
    }
  }

  signIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   this.setState({ userInfo });
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
  };

  validatePassword() {
    const { password } = this.state
    let isPasswordValid = password.length >= 8
    this.setState({ isPasswordValid: isPasswordValid })
  }

  render() {
    const { isPasswordValid, password, email, isShowPassword } = this.state
    return (
      <View style={this.getStyle().container}>
        {this.renderHeader("Sign in")}
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View style={ScreenStyles.container}>
            <View style={[this.getStyle().textInputView, { marginTop: 40 }]}>
              <TextInput
                placeholder={global.l10n.emailTextFieldPlaceholderTitle ?? ""}
                style={[this.getStyle().title, Styles.textInput, { height: 32, width: boxWidth - 48 }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='email-address'
                onChangeText={async text => {
                  await this.setState({ email: text });
                }}
                value={email}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <View style={[this.getStyle().textInputView, Styles.textInput]}>
              <TextInput
                placeholder={global.l10n.passwrodTextFieldPlaceholderTitle}
                style={[this.getStyle().title, Styles.textInput, { height: 32, width: boxWidth - 68 }]}
                secureTextEntry={!isShowPassword}
                allowFontScaling={false}
                value={password}
                placeholderTextColor="gray"
                maxLength={100}
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
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { this.setState({ isShowPassword: !isShowPassword }) }}
              >
                {isShowPassword ?
                  <Ionicons name="eye-off" color='white' size={26} />
                  :
                  <Ionicons name="eye" color='white' size={26} />
                }
              </TouchableOpacity>

            </View>
            {isPasswordValid ? null :
              <Text style={[this.getStyle().subTitle, { width: boxWidth, color: 'red' }]}>
                {global.l10n.inlineErrorPasswordLess}
              </Text>
            }
            <TouchableOpacity
              onPress={() => {
                if (isPasswordValid && password.length > 0) {
                  this.setState({ isLoading: true })
                  authentication(this.handleSignIn,email,password)
                } else {
                  Alert.alert(global.l10n.errorLoginPasswordLessTitle, global.l10n.errorLoginPasswrodLessSubtitle)
                  this.setState({ isLoading: true })
                }
              }}
            >
              <View style={[
                Styles.textInputView,
                {
                  backgroundColor: '#dfb445',
                  justifyContent: 'center'
                }]}>
                <Text style={[this.getStyle().title]}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: boxWidth }}>
              <TouchableOpacity
                onPress={() => { }}
              >
                <Text style={this.getStyle().title}>
                  Forgot password?
              </Text>
              </TouchableOpacity>
            </View>
            <Text style={this.getStyle().title}>
              OR
              </Text>
            {/* <GoogleSigninButton
              style={{ width: boxWidth, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn()}
              disabled={this.state.isSigninInProgress} /> */}
            <View style={{ width: boxWidth }}>
            </View>
            <Text style={[this.getStyle().title, { width: boxWidth, textAlign: 'center' }]}>
              Creating an account means you’re okay with
              Strategy Essential’s
                <Text style={[this.getStyle().title, { color: 'gray' }]}
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
