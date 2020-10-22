import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Image, Dimensions, TouchableOpacity } from 'react-native';
import Styles from '../../../BaseView/Styles'
const { width, height } = Dimensions.get('screen')

class firstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.emit('onBoardingIndicator', {
        index: 1,
      });
    });
  }

  render() {
    return (
      <View style={[Styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }]}>
        <Image
          style={[Styles.container, { position: 'absolute' }]}
          source={require('../../../../images/Onboarding/Onboarding_01.jpg')}
          resizeMode='cover'
        />
        <View style={{ position: 'absolute', backgroundColor: 'black', opacity: 0.6, width: width, height: height }} />
        <View style={{ position: 'absolute', width: width, height: height, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={[Styles.title, { fontSize: 30, marginVertical: 60, marginHorizontal: 24 }]}>
            แก่นกลยุทธ์+
            </Text>
          <Text style={[Styles.title, { fontSize: 20, marginBottom: 10, marginHorizontal: 24, textAlign: 'center' }]}>
            Learn the Essence of Strategy that will clear the path to success for your company
            </Text>
          <Text style={[Styles.subTitle, { fontSize: 16, marginBottom: 20, marginHorizontal: 24, textAlign: 'center' }]}>
            แก่นกลยุทธ์+ is an application for those involved in strategic science to learn how to think like a strategist.
            </Text>
        </View>
        <View style={{ position: 'absolute', bottom: 80, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              this.props.navigation.navigate('SigninStackScreen');
            }}
          >
            <View style={{ paddingHorizontal: 40, paddingVertical: 10, borderRadius: 4 }}>
              <Text style={[Styles.title]}> SKIP </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              this.props.navigation.navigate('SecondScreen');
            }}
          >
            <View style={{ backgroundColor: '#dfb445', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 4 }}>
              <Text style={[Styles.title, { color: 'black' }]}>  NEXT </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default firstScreen;
