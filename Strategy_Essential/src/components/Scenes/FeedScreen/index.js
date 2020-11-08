import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions, Platform, DeviceEventEmitter, Animated } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Share from "react-native-share";
import BaseComponent from '../../Utility/BaseComponent'
import Styles from '../../BaseView/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import axios from 'axios'
import { Appearance, useColorScheme } from 'react-native-appearance';

const { width, height } = Dimensions.get('screen')
const DOUBLE_PRESS_DELAY = 300;

class FeedScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            scheme: Appearance.getColorScheme(),
            lastTap: null,
            mockUrl: [
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_1.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_2.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_3.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_4.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_5.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_6.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_7.jpg'),
                    isLike: false,
                    isBookmark: false
                },
                {
                    url: require('../../../images/mockup/Quotes/Quotes_201005_8.jpg'),
                    isLike: false,
                    isBookmark: false
                },
            ]
        };
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            DeviceEventEmitter.addListener('navigateToPodcastDetail', this.navigateToPodcastDetail);
        });
        this.reRender = this.props.navigation.addListener('blur', () => {
            DeviceEventEmitter.removeListener('navigateToPodcastDetail')
        });
        Appearance.addChangeListener(({ colorScheme }) => {
            this.setState({ scheme: colorScheme })
            console.log("colorScheme : ", colorScheme)
        })
    }

    actionBar(index) {
        const { mockUrl } = this.state
        var mockUrlList = mockUrl
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                    <View style={{ marginRight: 14 }}>
                        <TouchableOpacity
                            onPress={() => {
                                mockUrlList[index].isLike = !mockUrlList[index].isLike
                                this.setState({ mockUrl: mockUrlList })
                            }}
                        >
                            {mockUrl[index].isLike ?
                                <AntDesign name="heart" color='white' size={24} />
                                :
                                <AntDesign name="hearto" color='white' size={24} />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                mockUrlList[index].isBookmark = !mockUrlList[index].isBookmark
                                this.setState({ mockUrl: mockUrlList })
                            }}
                        >
                            {mockUrlList[index].isBookmark ?
                                <FontAwesome name="bookmark" color='white' size={24} />
                                :
                                <FontAwesome name="bookmark-o" color='white' size={24} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    likeAndShareBar(likeNumber, shareNumber) {
        const { scheme } = this.state
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 20, height: 20, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#216FD9', marginLeft: 10 }}>
                        <Foundation name="like" color='white' size={20} />
                    </View>
                    <Text style={[this.getStyle(scheme).title, { marginLeft: 5 }]}>
                        {likeNumber}
                    </Text>
                </View>
            </View>
        )
    }

    tabImage = async () => {
        const fadeAnim = useRef(new Animated.Value(0)).current
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            const fadeOut = () => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 5000
                }).start();
            };
            const fadeIn = () => {
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 5000
                }).start(
                    ({ finished }) => {
                        if (finished) {
                            fadeOut()
                        }
                    }
                );
            };
            fadeOut()
            console.log("fadeAnim : ", fadeAnim)
        } else {
            await this.setState({ lastTap: now, isTeserPause: !isTeserPause })
        }
        return fadeAnim
    }


    renderImages() {
        const { mockUrl } = this.state
        const imageWidth = Platform.isPad ? width * 2 / 3 : width
        var imageList = []
        for (var i = 0; i < mockUrl.length; i++) {
            imageList.push(
                <View
                    style={{ width: width, justifyContent: 'center', alignItems: 'center' }}
                    key={i}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            // this.tabImage()
                        }}
                    >
                        <Image
                            style={{ width: width, height: width }}
                            source={mockUrl[i].url}
                        />
                    </TouchableOpacity>
                    {this.actionBar(i)}
                    {this.likeAndShareBar(2, 4)}
                    <View style={{width:width,height:0.5,opacity:0.5,backgroundColor:'gray',marginBottom:20}}/>
                </View>
            )
        }
        return imageList
    }

    render() {
        const { scheme } = this.state
        return (
            <SafeAreaView style={this.getStyle(scheme).container}>
                {this.renderFooter()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderImages()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default FeedScreen;
