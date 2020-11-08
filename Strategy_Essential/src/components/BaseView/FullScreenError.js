import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import BaseComponent from '../Utility/BaseComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('screen')

class FullScreenError extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showError: true
        };
    }

    renderModalFullScreenError() {
        return (
            <Modal
                isVisible={this.state.showError}
                hasBackdrop={true}
                style={{ margin: 0, width: width, height: height }}
            >
                <View style={[this.getStyle().container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }]}>
                    <View style={{ marginTop: -height / 3 }}>
                        <AntDesign name="warning" color='gray' size={width / 3} />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.dismissErrorScreen()
                            this.setState({ showError: false })
                        }}
                    >
                        <Text style={[this.getStyle().title, { color: 'black' }]}> FullScreenError </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    renderFullScreenError() {
        retrun(
            <View style={[this.getStyle().container, { justifyContent: 'center', alignItems: 'center' }]}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.dismissErrorScreen()
                        this.setState({ showError: false })
                    }}
                >
                    <Text style={[this.getStyle().title, { color: 'white' }]}> FullScreenError </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        if (this.props.isFullScreen) {
            return this.renderModalFullScreenError()
        } else {
            return this.renderFullScreenError()
        }
    }
}

export default FullScreenError;
