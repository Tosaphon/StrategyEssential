import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../../BaseView/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from "../../../Utility/BaseComponent";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen')
const boxWidth = width * 3 / 4

class Regsitration extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      comfirmPassword: "",
      mobileNumber: "",
      couponCode: "",
      isFullNameValidate: null,
      isEmailValidate: null,
      isPasswordValidate: null,
      isConfirmPasswordValidate: null,
      isMobileNumberValidate: null,
      isCouponCodeValidate: null,
      isLoading: false
    };
  }

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  validateName() {

  }
  validateMobileNumber() {

  }

  validateEmail() {

  }

  validatePassword() {

  }

  validateConfirmPassword() {

  }
  validateCouponCode() {

  }
  
  async navigateToOTPConfirmation() {
    await AsyncStorage.setItem('token','test')
    await this.setState({ isLoading: true })
    await this.props.navigation.navigate('OTPConfirmationScreen',
      {
        mobileNumber: this.state.mobileNumber
      })
    await this.setState({ isLoading: false })
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.renderHeader("Register", this.navigateBack)}
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View style={ScreenStyles.container}>
            <View style={[Styles.textInputView, { marginTop: 40 }]}>
              <TextInput
                placeholder="Full Name"
                style={[Styles.title, { height: 32, }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='default'
                onBlur={() => {
                  this.validateName()
                }}
                onChangeText={async text => {
                  await this.setState({ fullName: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <View style={[Styles.textInputView]}>
              <TextInput
                placeholder="Email"
                style={[Styles.title, { height: 32, }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='email-address'
                onBlur={() => {
                  this.validateEmail()
                }}
                onChangeText={async text => {
                  await this.setState({ email: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <View style={[Styles.textInputView]}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                style={[Styles.title, { height: 32 }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='default'
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
                blurOnSubmit={false}
              />
            </View>
            <View style={[Styles.textInputView]}>
              <TextInput
                placeholder="Confirm Password"
                style={[Styles.title, { height: 32, }]}
                placeholderTextColor="gray"
                maxLength={40}
                keyboardType='email-address'
                onBlur={() => {
                  this.validateConfirmPassword()
                }}
                onChangeText={async text => {
                  await this.setState({ confirmPassword: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <Text style={[Styles.title, { width: boxWidth, marginVertical: 10 }]}>
              Use 8 or more characters with a mix of letters,
              numbers
                  </Text>

            <View style={[Styles.textInputView]}>
              <TextInput
                placeholder="Mobile Number"
                style={[Styles.title, { height: 32, }]}
                placeholderTextColor="gray"
                maxLength={10}
                keyboardType='phone-pad'
                onBlur={() => {
                  this.validateMobileNumber()
                }}
                onChangeText={async text => {
                  await this.setState({ mobileNumber: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View>
            <Text style={[Styles.title, { width: boxWidth, marginVertical: 10 }]}>
              The application will sent OTP code for authentication
              Your mobile phone number by SMS
                  </Text>
            {/* <View style={[Styles.textInputView]}>
              <TextInput
                placeholder="Coupon Code (Optional)"
                style={[Styles.title, { height: 32, }]}
                placeholderTextColor="gray"
                maxLength={10}
                keyboardType='default'
                onBlur={() => {
                  this.validateCouponCode()
                }}
                onChangeText={async text => {
                  await this.setState({ mobileNumber: text });
                }}
                autoFocus={false}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType={'next'}
                blurOnSubmit={false}
              />
            </View> */}

          </View>
        </ScrollView>
        <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.navigateToOTPConfirmation()
            }}
          >
            <View style={[Styles.textInputView, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#dfb445', borderRadius: 10 }]}>
              <Text style={[Styles.title]}>
                NEXT
            </Text>
            </View>
          </TouchableOpacity>
        </View>
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


export default Regsitration;
