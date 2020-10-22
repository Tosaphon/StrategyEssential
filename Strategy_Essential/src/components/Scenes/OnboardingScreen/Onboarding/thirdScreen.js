import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Image, Dimensions, TouchableOpacity } from 'react-native';
import Styles from '../../../BaseView/Styles'
const { width, height } = Dimensions.get('screen')

class thirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.emit('onBoardingIndicator', {
        index: 3,
      });
    });
  }

  render() {
    return (
      <View style={[Styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }]}>
        <Image
          style={[Styles.container, { position: 'absolute' }]}
          source={require('../../../../images/Onboarding/Onboarding_03.jpg')}
          resizeMode='cover'
        />
        <View style={{ position: 'absolute', backgroundColor: 'black', opacity: 0.6, width: width, height: height }} />
        <View style={{ position: 'absolute', width: width, height: height, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={[Styles.title, { fontSize: 30, marginVertical: 60, marginHorizontal: 24 }]}>
            แก่นกลยุทธ์+
            </Text>
          <Text style={[Styles.title, { fontSize: 16, marginBottom: 10,marginTop:300, marginHorizontal: 24, textAlign: 'center' }]}>
            Save content to your private reading list for offline reading{'\n\n'}
            Download videos and podcast for offline viewing{'\n\n'}
            Stay up to date when new content is released
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
              this.props.navigation.navigate('SigninStackScreen');
            }}
          >
            <View style={{ backgroundColor: '#dfb445', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 4 }}>
              <Text style={[Styles.title, { color: 'black' }]}>  GET STARTD </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default thirdScreen;
