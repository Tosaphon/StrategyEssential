import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import BaseComponent from "../Utility/BaseComponent";
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('screen')

class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        hasBackdrop={true}
        style={{ margin: 0, width: width, height: height }}
      >
        {this.renderLoadingView()}
      </Modal>
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.ActivityIndicatorView}>
        <View
          style={[
            styles.ActivityIndicatorView,
            { backgroundColor: this.props.scheme == 'light' ? 'black' : 'white', opacity: 0.2 }
          ]}
        />
        <ActivityIndicator
          //visible={this.props.visible}
          color={this.props.scheme == 'light' ? 'black' : 'white'}
          size="large"
          style={styles.ActivityIndicatorStyle}
        />
        <View style={styles.ActivityIndicatorBg}></View>
      </View>
    )
  }

  render() {
    if (this.props.isVisible) {
      return this.renderLoadingView()
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  ActivityIndicatorView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 9999
  },
  ActivityIndicatorBg: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  ActivityIndicatorStyle: {
    position: "absolute",
    alignSelf: "center"
  }
});

export default LoadingView;
