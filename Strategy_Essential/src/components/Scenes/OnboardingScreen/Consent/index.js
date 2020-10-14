import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../../BaseView/Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import BaseComponent from "../../../Utility/BaseComponent";
const { width, height } = Dimensions.get('screen')
const boxWidth = width * 3 / 4

class Consent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAgree: false
        };
    }

    toggleConsent() {
        this.setState({ isAgree: !this.state.isAgree })
    }
    navigateToHome() {
        AsyncStorage.setItem("isMember", "true")
        DeviceEventEmitter.emit('updateRootView');
        console.log("emit updateRootView")
    }

    render() {
        const { isAgree } = this.state
        return (
            <View style={[Styles.container, { alignItems: 'center' }]}>
                {this.renderHeader("Consents", this.navigateBack)}
                <ScrollView style={{ flex: 1, width: '85%', backgroundColor: 'white' }}>
                </ScrollView>
                <View style={{ marginVertical: 10, width: '85%', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}
                        activeOpacity={1}
                        onPress={() => { this.toggleConsent() }}
                    >
                        <MaterialCommunityIcons
                            style={{ marginRight: 10 }}
                            name={this.state.isAgree ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                            color='white'
                            size={26} />
                        <Text style={Styles.title}>
                            I Agree to the consents
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            this.navigateToHome()
                        }}
                        disabled={!isAgree}
                    >
                        <View style={[Styles.textInputView, { justifyContent: 'center', alignItems: 'center', backgroundColor: isAgree ? '#dfb445' : 'gray', borderRadius: 10 }]}>
                            <Text style={[Styles.title,{}]}>
                                NEXT
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Consent;
