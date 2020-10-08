import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'

import Styles from '../../../BaseView/Styles';
const { width, height } = Dimensions.get('screen')

class HelpScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={Styles.container}>
                {this.renderHeader("Help", this.navigateBack)}
                <Text> index </Text>
            </View>
        );
    }
}

export default HelpScreen;
