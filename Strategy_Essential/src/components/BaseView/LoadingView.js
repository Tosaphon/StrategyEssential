import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.visible) {
      return (
        <View style={styles.ActivityIndicatorView}>
          <View
            style={[
              styles.ActivityIndicatorView,
              { backgroundColor: "black", opacity: 0.2 }
            ]}
          />
          <ActivityIndicator
            //visible={this.props.visible}
            color="black"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
          <View style={styles.ActivityIndicatorBg}></View>
        </View>
      );
    } else {
      return null;
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
    zIndex:9999
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
