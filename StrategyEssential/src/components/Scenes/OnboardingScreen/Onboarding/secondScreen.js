import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Styles from '../../../BaseView/Styles'
const { width, height } = Dimensions.get('screen')

class secondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.reRender = this.props.navigation.addListener('focus', () => {
      DeviceEventEmitter.emit('onBoardingIndicator', {
        index: 2,
      });
    });
  }

  render() {
    return (
      <View style={[Styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' }]}>
        <Image
          style={[Styles.container, { position: 'absolute' }]}
          source={require('../../../../images/Onboarding/Onboarding_02.png')}
          resizeMode='contain'
        />
        <View style={{ position: 'absolute', bottom: 80, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              this.props.navigation.navigate('SigninStackScreen');
            }}
          >
            <View style={{ paddingHorizontal: 40, paddingVertical: 10, borderRadius: 4 }}>
              <Text style={{}}> SKIP </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
              this.props.navigation.navigate('ThirdScreen');
            }}
          >
            <View style={{ backgroundColor: 'white', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 4 }}>
              <Text style={{}}> NEXT </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default secondScreen;
