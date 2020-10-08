import React, { Component } from 'react';
import { View, Text, SafeAreaView, DeviceEventEmitter, Dimensions, TouchableWithoutFeedback } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import Styles from '../../../BaseView/Styles';
import { Appearance, useColorScheme } from 'react-native-appearance';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('screen')

class PodcastPlayer extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: true,
            maximumTime: 20000,
            currentTime: 0,
            isPodcastPlay: true,
            isRate: false,
            isVisible: this.props.isVisible,
            scheme: Appearance.getColorScheme()
        };
        DeviceEventEmitter.emit('audioBarActive', {
            isActive: false,
        });
    }

    async dismiss() {
        // await this.navigateBack()
        // await this.setState({ isModalVisible: false })

        await this.props.dismiss()
        await DeviceEventEmitter.emit('audioBarActive', {
            isActive: true,
        });
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

    render() {
        const { maximumTime, currentTime, isPodcastPlay, isRate, isVisible } = this.state
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
                <SafeAreaView style={[Styles.container, { alignItems: 'center' }]}>
                    <View style={{ width: width / 2, height: width / 2, backgroundColor: 'white', marginTop: 100 }}>
                    </View>
                    <Slider
                        style={{ width: width - 60, height: 40 }}
                        onValueChange={(value) => { this.setState({ currentTime: value }) }}
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
                            onPress={() => { }}
                        >
                            <AntDesign name="plus" color='white' size={30} />
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Wish List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                            onPress={() => {
                                this.setState({ isRate: !isRate, isShowRating: true })
                            }}
                        >
                            <AntDesign name={isRate ? "star" : "staro"} color='white' size={30} />
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Rate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                            onPress={() => { }}
                        >
                            <AntDesign name="sharealt" color='white' size={30} />
                            <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', width: width, marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ marginHorizontal: 30 }}
                            activeOpacity={0.9}
                            onPress={() => { }}
                        >
                            <Ionicons name="play-back" color='#dfb445' size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 30 }}
                            activeOpacity={0.9}
                            onPress={() => { this.setState({ isPodcastPlay: !isPodcastPlay }) }}
                        >
                            {isPodcastPlay ?
                                <Ionicons name="pause" color='#dfb445' size={60} />
                                :
                                <Entypo name="controller-play" color='#dfb445' size={60} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 30 }}
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
            </Modal>
        );
    }
}

export default PodcastPlayer;
