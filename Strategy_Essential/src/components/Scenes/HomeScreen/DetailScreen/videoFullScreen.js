import React from 'react';
import { DeviceEventEmitter, Dimensions, Image, SafeAreaView, Text, TouchableWithoutFeedback, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Appearance, useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Share from "react-native-share";
import Video from 'react-native-video';
import Styles from '../../../BaseView/Styles';
import BaseComponent from '../../../Utility/BaseComponent';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from 'react-native-video-controls';
const { width, height } = Dimensions.get('screen')

class VideoFullScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            timer: 2
        };
    }
    componentDidMount() {
        this.fullScreenPlayer.presentFullscreenPlayer();
    }
    startCountDown() {
        this.interval = setInterval(async () => {
            await this.setState(prevState => ({ timer: prevState.timer - 1 }));
            if (this.state.timer === 0) {
                clearInterval(this.interval);
                this.fullScreenPlayer.presentFullscreenPlayer();
            }
        }, 1000);
    }
    render() {
        return (
            <View style={this.getStyle().container}>
                <Video
                    pictureInPicture={true}
                    fullscreen={true}
                    playInBackground={true}
                    source={require('../../../../Videos/video_01.mp4')}
                    ref={(ref) => {
                        this.fullScreenPlayer = ref
                    }}
                    onError={(error) => { console.log('video error : ', error) }}
                />
            </View>
        );
    }
}

export default VideoFullScreen;
