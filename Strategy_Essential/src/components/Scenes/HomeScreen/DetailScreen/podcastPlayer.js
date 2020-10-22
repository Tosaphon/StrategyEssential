import React, { Component } from 'react';
import { View, Text, SafeAreaView, DeviceEventEmitter, Dimensions, TouchableWithoutFeedback, TouchableOpacity, ScrollView, BackHandler, TextInput } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import Styles from '../../../BaseView/Styles';
import { Appearance, useColorScheme } from 'react-native-appearance';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('screen')
const ENUM_SPEED = [
    1, 1.5, 2, 0.5
]

class PodcastPlayer extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: true,
            maximumTime: 1000,
            currentTime: this.props.currentTime,
            isPodcastPlay: true,
            isRate: false,
            isBookmark: false,
            isVisible: this.props.isVisible,
            paused: false,
            displaySavePodcast: false,
            speedIndex: 0,
            savedTitle: "",
            scheme: Appearance.getColorScheme()
        };
        DeviceEventEmitter.emit('audioBarActive', {
            isActive: false,
        });

    }
    componentDidMount() {
        // this.reRender = this.props.navigation.addListener('focus', () => {
        //     this.setState({ paused: false })
        // });
        // this.reRender = this.props.navigation.addListener('blur', () => {
        //     this.setState({ paused: true })
        // });
        BackHandler.addEventListener("hardwareBackPress", this.backHandle);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backHandle);
    }

    backHandle = () => {
        this.props.dismiss()
        DeviceEventEmitter.emit('audioBarActive', {
            isActive: true,
            currentTime: this.state.currentTime + 1
        });

        return true;
    }

    async dismiss() {
        // await this.navigateBack()
        // await this.setState({ isModalVisible: false })
        console.log("dismiss")
        await this.props.dismiss()
        await DeviceEventEmitter.emit('audioBarActive', {
            isActive: true,
            currentTime: this.state.currentTime
        });
    }

    savedPodcast() {
        this.setState({ displaySavePodcast: true, paused: true })
    }

    async confirmSavePodcast() {
        const { savedTitle, currentTime } = this.state
        const podcastSaved = await AsyncStorage.getItem("podcastSaved")
        var appendPodcast = {
            title: savedTitle,
            timeString: this.parseTime(currentTime),
            time: currentTime
        }
        if (podcastSaved) {
            var json = JSON.parse(podcastSaved)
            json.podcast.push(appendPodcast)
            const jsonString = JSON.stringify(json)
            await AsyncStorage.setItem('podcastSaved', jsonString)
        } else {
            var json = {
                podcast: []
            }
            json.podcast.push(appendPodcast)
            const jsonString = JSON.stringify(json)
            await AsyncStorage.setItem('podcastSaved', jsonString)
        }
        this.setState({ displaySavePodcast: false, paused: false })
    }

    speedUp() {
        const { speedIndex } = this.state
        if (speedIndex + 1 <= ENUM_SPEED.length - 1) {
            this.setState({ speedIndex: speedIndex + 1 })
        } else {
            this.setState({ speedIndex: 0 })
        }
    }

    parseTime(time) {
        var hour = parseInt(time / (60 * 60))
        var min = parseInt(time / 60) % 60
        var sec = parseInt(time % 60)
        if (sec / 10 < 1) {
            sec = "0" + sec
        }
        if (min / 10 < 1) {
            min = "0" + min
        }
        var str = "" + hour + ":" + min + ":" + sec
        return str
    }

    seek(time) {
        time = Math.round(time);
        this.player && this.player.seek(time);
        this.setState({
            currentTime: time,
            paused: false,
        });
    }
    async setTime(data) {
        await this.setState({ currentTime: Math.floor(data.currentTime) });
    }
    async setDuration(data) {
        await this.setState({ maximumTime: Math.floor(data.duration) });
    }

    render() {
        const { maximumTime, currentTime, isPodcastPlay, isRate, isVisible, isBookmark, paused, displaySavePodcast, speedIndex } = this.state
        return (
            <Modal
                isVisible={this.props.isVisible}
                style={{ margin: 0, width: width, height: height }}
                hasBackdrop={true}
                onSwipeComplete={() => {
                    this.dismiss()
                }}

                swipeThreshold={100}
                swipeDirection='down'
            >
                <Modal
                    isVisible={displaySavePodcast}
                    style={{ margin: 0, width: width, height: height, justifyContent: 'center', alignItems: 'center' }}
                    hasBackdrop={true}
                    onBackdropPress={() => {
                        this.setState({ displaySavePodcast: false, paused: false })
                    }}
                >
                    <View style={{ width: width * 2 / 3, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', marginBottom: 100 }}>
                        <Text style={[this.getStyle().title, { marginTop: 10, color: 'black', fontSize: 18 }]}>
                            Save Podcast
                        </Text>
                        <Text style={[this.getStyle().subTitleGray, { color: 'black', marginHorizontal: 24 }]} numberOfLines={2} >
                            วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199
                        </Text>
                        <Text style={[this.getStyle().subTitleGray, { color: 'black', marginHorizontal: 24 }]} numberOfLines={2} >
                            {this.parseTime(currentTime)}
                        </Text>
                        <View style={{
                            marginVertical: 10,
                            marginHorizontal: 24,
                            borderRadius: 10,
                            alignItems: 'center',
                            height: 40,
                            flexDirection: 'row',
                            borderWidth: 0.5,
                            borderColor: 'gray'
                        }}>
                            <TextInput
                                style={[Styles.textInput, { marginLeft: 8, flex: 1, color: 'black' }]}
                                placeholder='Title'
                                placeholderTextColor='gray'
                                onFocus={() => { }}
                                onChangeText={async text => {
                                    await this.setState({ savedTitle: text });
                                }}
                                value={this.state.savedTitle}
                                autoFocus={true}
                                autoCorrect={false}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{ width: '50%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#707070', borderRightWidth: 0.5 }}
                                onPress={() => {
                                    this.setState({ displaySavePodcast: false, paused: false })
                                }}
                            >
                                <Text style={[Styles.title, { color: 'gray', paddingVertical: 10 }]}>
                                    Cancel
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{ width: '50%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#707070' }}
                                onPress={() => {
                                    this.confirmSavePodcast()
                                }}
                            >
                                <Text style={[Styles.title, { color: 'black', paddingVertical: 10 }]}>
                                    Save
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Video
                    rate={ENUM_SPEED[speedIndex]}
                    paused={paused}
                    playInBackground={true}
                    onLoad={this.setDuration.bind(this)}
                    onProgress={this.setTime.bind(this)}
                    source={require('../../../../Videos/video_01.mp4')}
                    ref={(ref) => {
                        this.player = ref
                    }}
                />
                <SafeAreaView style={[Styles.container, { alignItems: 'center' }]}>
                    <View style={{ width: width / 2, height: width / 2, backgroundColor: 'white', marginTop: 100 }}>
                    </View>
                    <Slider
                        style={{ width: width - 60, height: 40 }}
                        onValueChange={(value) => { this.setState({ currentTime: value, paused: true }) }}
                        onSlidingComplete={(value) => { this.seek(value) }}
                        minimumValue={0}
                        maximumValue={maximumTime}
                        minimumTrackTintColor="#dfb445"
                        maximumTrackTintColor="#e8cb80"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 40 }}>
                        <Text style={[Styles.title, { textAlign: 'left', marginLeft: 10 }]}>
                            {this.parseTime(currentTime)}
                        </Text>
                        <Text style={[Styles.title, { textAlign: 'right' }]}>
                            {this.parseTime(maximumTime)}
                        </Text>
                    </View>

                    <Text style={[Styles.title, { marginHorizontal: 30, marginVertical: 20 }]}>
                        วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา ‘ลองดูสิ’ | The Secret Sauce EP.199
                    </Text>

                    <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10, width: width - 40 }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                            onPress={() => {
                                this.setState({ isBookmark: !isBookmark })
                            }}
                        >
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                {isBookmark ?
                                    <FontAwesome name="bookmark" color='white' size={24} />
                                    :
                                    <FontAwesome name="bookmark-o" color='white' size={24} />
                                }
                            </View>
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>My List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                            onPress={() => {
                                this.setState({ isRate: !isRate })
                            }}
                        >
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <AntDesign name={isRate ? "like1" : "like2"} color='white' size={30} />
                            </View>
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Rate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                            onPress={() => { }}
                        >
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome5 name="share" color='white' size={26} />
                            </View>
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => { }}
                        >
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="download" color='white' size={30} />
                            </View>
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Download</Text>
                        </TouchableOpacity>
                        <View style={{ height: 40, backgroundColor: 'gray', width: 1, opacity: 0.5, marginLeft: 20, marginRight: 10 }} />
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                            onPress={() => { this.speedUp() }}
                        >
                            <View style={{ width: 60, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 24, color: 'white', fontWeight: 'bold' }]}>{ENUM_SPEED[speedIndex]}X</Text>
                            </View>
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Speed</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', width: width, marginTop: 60, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity
                            style={{ marginHorizontal: 20 }}
                            activeOpacity={0.9}
                            onPress={() => { }}
                        >
                            <Ionicons name="play-back" color='#dfb445' size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            activeOpacity={0.9}
                            onPress={() => {
                                this.seek(currentTime - 30)
                            }}
                        >
                            <MaterialIcons name="replay-30" color='#dfb445' size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            activeOpacity={0.9}
                            onPress={() => { this.setState({ isPodcastPlay: !isPodcastPlay, paused: !paused }) }}
                        >
                            {isPodcastPlay ?
                                <Ionicons name="pause" color='#dfb445' size={60} />
                                :
                                <Entypo name="controller-play" color='#dfb445' size={60} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            activeOpacity={0.9}
                            onPress={() => {
                                this.seek(currentTime + 30)
                            }}
                        >
                            <MaterialIcons name="forward-30" color='#dfb445' size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 20 }}
                            activeOpacity={0.9}
                            onPress={() => { }}
                        >
                            <Ionicons name="play-forward" color='#dfb445' size={40} />
                        </TouchableOpacity>

                    </View>

                </SafeAreaView>
                <SafeAreaView style={{ position: 'absolute', left: 24, top: 40 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss()
                        }}
                    >
                        <Entypo name="chevron-thin-down" color='white' size={26} />
                    </TouchableOpacity>
                </SafeAreaView>
                <SafeAreaView style={{ position: 'absolute', right: 24, top: 40 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.savedPodcast()
                        }}
                    >
                        <MaterialCommunityIcons name="timeline-plus-outline" color='white' size={30} />
                    </TouchableOpacity>
                </SafeAreaView>

            </Modal>
        );
    }
}

export default PodcastPlayer;
