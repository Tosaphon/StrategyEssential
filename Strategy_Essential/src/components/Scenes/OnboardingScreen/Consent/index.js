import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../../../BaseView/Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseComponent from "../../../Utility/BaseComponent";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
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
        DeviceEventEmitter.emit('updateRootView');
        console.log("emit updateRootView")
    }

    render() {
        return (
            <View style={[Styles.container, { alignItems: 'center' }]}>
                {this.renderHeader("Consnets", this.navigateBack)}
                <ScrollView style={{ flex: 1, width: '85%', backgroundColor: 'white' }}>
                </ScrollView>
                <View style={{ marginVertical: 10, width: '85%', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: 'red' }}
                        activeOpacity={1}
                        onPress={() => { this.toggleConsent() }}
                    >
                        <MaterialCommunityIcons
                            style={{ marginRight: 10 }}
                            name={this.state.isAgree ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                            color='white'
                            size={26} />
                        <Text style={Styles.title}>
                            I Agree to the consent
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ width: 20, height: 10, backgroundColor: 'red', right: 0 }}>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            this.navigateToHome()
                        }}
                    >
                        <View style={[Styles.textInputView, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#dfb445', borderRadius: 10 }]}>
                            <Text style={[Styles.title]}>
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
