import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../../BaseView/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from "../../../Utility/BaseComponent";
const { width, height } = Dimensions.get('screen')
const boxWidth = width * 3 / 4

class OTPConfirmation extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: this.props.route.params.mobileNumber,
            no1: '',
            no2: '',
            no3: '',
            no4: '',
            isLoading: false
        };
    }
    submit() {
        AsyncStorage.setItem("isMember","true")
        DeviceEventEmitter.emit('updateRootView');
        console.log("emit updateRootView")
    }

    navigateToHome() {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: '' }
                ],
            })
        );
    }

    render() {
        return (
            <View style={this.getStyle().container}>
                {this.renderHeader("OTP Confirmation")}
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <View style={ScreenStyles.container}>
                        <Text style={[this.getStyle().title, { marginTop: 40 }]}>Ref Code is</Text>
                        <Text style={[this.getStyle().title]}>AOPC</Text>
                        <View style={{ width: boxWidth, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={[ScreenStyles.OTPBoxView, { marginTop: 40, marginHorizontal: 10 }]}>
                                <TextInput
                                    ref={(input) => { this.TextInput1 = input; }}
                                    placeholder="-"
                                    style={[this.getStyle().title, Styles.textInput, { height: 32, }]}
                                    placeholderTextColor="gray"
                                    maxLength={1}
                                    keyboardType='number-pad'
                                    onBlur={() => {
                                        // this.validateName()
                                    }}
                                    onChangeText={async text => {
                                        await this.setState({ no1: text });
                                        await this.textInput2.focus()
                                    }}
                                    autoFocus={true}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { this.textInput2.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={[ScreenStyles.OTPBoxView, { marginTop: 40, marginHorizontal: 10 }]}>
                                <TextInput
                                    ref={(input) => { this.textInput2 = input; }}
                                    placeholder="-"
                                    style={[this.getStyle().title, Styles.textInput, { height: 32, }]}
                                    placeholderTextColor="gray"
                                    maxLength={1}
                                    keyboardType='number-pad'
                                    onBlur={() => {
                                        // this.validateName()
                                    }}
                                    onChangeText={async text => {
                                        await this.setState({ no2: text });
                                        await this.textInput3.focus()
                                    }}
                                    autoFocus={false}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { this.textInput3.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={[ScreenStyles.OTPBoxView, { marginTop: 40, marginHorizontal: 10 }]}>
                                <TextInput
                                    ref={(input) => { this.textInput3 = input; }}
                                    placeholder="-"
                                    style={[this.getStyle().title, Styles.textInput, { height: 32, }]}
                                    placeholderTextColor="gray"
                                    maxLength={1}
                                    keyboardType='number-pad'
                                    onBlur={() => {
                                        // this.validateName()
                                    }}
                                    onChangeText={async text => {
                                        await this.setState({ no3: text });
                                        await this.textInput4.focus()
                                    }}
                                    autoFocus={false}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { this.textInput4.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={[ScreenStyles.OTPBoxView, { marginTop: 40, marginHorizontal: 10 }]}>
                                <TextInput
                                    ref={(input) => { this.textInput4 = input; }}
                                    placeholder="-"
                                    style={[this.getStyle().title, Styles.textInput, { height: 32, }]}
                                    placeholderTextColor="gray"
                                    maxLength={1}
                                    keyboardType='number-pad'
                                    onBlur={() => {
                                        // this.validateName()
                                    }}
                                    onChangeText={async text => {
                                        await this.setState({ no4: text });
                                        this.submit()
                                    }}
                                    autoFocus={false}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    returnKeyType={'next'}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        <Text
                            style={[this.getStyle().title, { textAlign: 'center', marginHorizontal: 60, marginTop: 40 }]}>
                            OTP just sent to your mobile phone. Please check your
                            Message box.
                        </Text>
                    </View>
                </ScrollView>
                <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            this.submit()
                        }}
                    >
                        <View style={[this.getStyle().textInputView, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#dfb445', borderRadius: 10 }]}>
                            <Text style={[this.getStyle().title]}>
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
    },
    OTPBoxView: {
        backgroundColor: '#2e2e2f',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


export default OTPConfirmation;
