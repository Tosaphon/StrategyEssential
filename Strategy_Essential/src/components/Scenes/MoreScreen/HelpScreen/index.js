import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';

import Styles from '../../../BaseView/Styles';
const { width, height } = Dimensions.get('screen')

class HelpScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            scheme: Appearance.getColorScheme()
        };
    }

    render() {
        return (
            <View style={this.getStyle().container}>
                {this.renderHeader("Help")}
                <Text> index </Text>
            </View>
        );
    }
}

export default HelpScreen;
