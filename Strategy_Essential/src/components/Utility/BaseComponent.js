import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, DeviceEventEmitter, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from "../BaseView/Styles";
import LoadingView from "../BaseView/LoadingView";
import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ENUM_THEME = {
    dark: "dark",
    light: 'light'
}
const { width, height } = Dimensions.get('screen')

class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheme: ENUM_THEME.dark,
        };
        this.renderHeader = this.renderHeader.bind(this)
        this.navigateBack = this.navigateBack.bind(this)
        this.renderLoadingView = this.renderLoadingView.bind(this)
        this.renderHeaderBG = this.renderHeaderBG.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.navigateToContentsDetail = this.navigateToContentsDetail.bind(this)
        this.getStyle = this.getStyle.bind(this)
        this.analyticsTracker = this.analyticsTracker.bind(this)
        // this.eventListener = DeviceEventEmitter.addListener('navigateToPodcastDetail', this.navigateToPodcastDetail);
        this.eventListener = DeviceEventEmitter.addListener('switchTheme', this.switchTheme);
        this.eventListener = DeviceEventEmitter.addListener('switchLanguage', this.switchLanguage);
        this.getTheme()
    }

    getTheme = async () => {
        var theme = await AsyncStorage.getItem('theme')
        theme = theme == ENUM_THEME.light ? ENUM_THEME.light : ENUM_THEME.dark
        await this.setState({ scheme: theme })
    }
    // async l10n() {
    //     if (global.currentLanguage == 'en') {
    //         // console.log('global.l10n.en : ',global.l10n.en)
    //         return global.l10n.en.themeLabel
    //     } else {
    //         // console.log('global.l10n.th : ',global.l10n.th)
    //         return global.l10n.th.themeLabel
    //     }
    // }

    navigateBack = async () => {
        await this.props.navigation.goBack()
    }
    navigateToContentsDetail = () => {
        this.props.navigation.navigate('ContentsDetailNavigation')
    }
    navigateToPodcastDetail = () => {
        this.props.navigation.navigate('ContentsDetailNavigation', { screen: 'PodcastsPlayer' })
    }

    switchTheme = async (event) => {
        await this.setState({ scheme: event.theme })
        console.log('theme', event.theme)
    }

    switchLanguage = async (event) => {
        console.log('switchLanguage')
        await this.setState({})
    }

    renderLoadingView(visible) {
        return <LoadingView visible={visible} />
    }
    renderTitleHeader(title) {
        const { scheme } = this.state
        return (
            <View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: scheme == 'light' ? '#2C3E4C' : null
            }}>
                <SafeAreaView style={{
                    width: width,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                    <Text style={[this.getStyle().titleHeader, { width: '70%', textAlign: 'center', fontSize: 20 }]}>{title}</Text>
                </SafeAreaView>
            </View>
        )
    }

    analyticsTracker = async (label, information) => {
        await analytics().logEvent(label, information)
    }

    renderHeader(title, rightAction, enableEdit) {
        const { scheme } = this.state
        return (
            <View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: scheme == 'light' ? '#2C3E4C' : null
            }}>
                <SafeAreaView style={{
                    width: width,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                    <TouchableOpacity
                        style={{
                            width: '15%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => { this.navigateBack() }}
                    >
                        <Ionicons name="chevron-back" color='white' size={26} />
                    </TouchableOpacity>

                    <Text style={[this.getStyle().titleHeader, { width: '70%', textAlign: 'center', fontSize: 20 }]}>{title}</Text>
                    <TouchableOpacity
                        style={{
                            width: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: rightAction ? 1 : 0
                        }}
                        onPress={() => {
                            rightAction()
                        }}
                    >
                        {enableEdit ?
                            <Text style={[this.getStyle().title, { marginRight: 16, height: 26 }]}>
                                Done
                            </Text>
                            :
                            <MaterialIcons style={{ marginRight: 16 }} name="edit" color={scheme == 'light' ? 'black' : 'white'} size={26} />
                        }
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        )
    }

    renderHeaderBG(barHeight, scheme) {
        const darkTheme = [
            'rgba(0, 0, 0,1)',
            'rgba(0, 0, 0,1)',
            'rgba(0, 0, 0,8)',
            'rgba(0, 0, 0,0)',
        ]
        const lightTheme = [
            'rgba(255, 255, 255,1)',
            'rgba(255, 255, 255,1)',
            'rgba(255, 255, 255,1)',
            'rgba(255, 255, 255,1)',
        ]
        return (
            <View style={{
                width: width,
                backgroundColor: scheme == 'light' ? 'white' : 'black',
                alignItems: 'flex-start',
                position: 'absolute',
                height: barHeight,
            }}>
                {/* <LinearGradient
                    colors={this.state.scheme == 'light' ? 'white' : 'black'}
                    style={{
                        width: '100%',
                        height: barHeight,
                        overflow: 'visible',
                    }} /> */}
            </View>
        )
    }
    renderFooter() {
        const { scheme } = this.state
        return (
            <View style={{
                width: width,
                backgroundColor: 'transparent',
                alignItems: 'flex-end',
                bottom: 0,
                position: 'absolute'
            }}>
                <LinearGradient
                    colors={[
                        'rgba(255,255, 255,0)',
                        'rgba(255,255, 255,0.05)',
                        'rgba(255,255, 255,0.16)',
                    ]}
                    style={{
                        width: '100%',
                        height: height / 4,
                        overflow: 'visible',
                    }} />
            </View>
        )
    }
    getIconColor(isUseCI) {
        const { scheme } = this.state
        return scheme === 'light' ? isUseCI ? '#dfb445' : 'black' : 'white'
    }

    getToggleIcon(isSelect) {
        const { scheme } = this.state
        if (scheme === 'light') {
            return isSelect ? 'black' : 'gray'
        } else {
            return isSelect ? 'white' : 'gray'
        }
    }

    getStyle() {
        const { scheme } = this.state
        const { width, height } = Dimensions.get('screen')
        const boxWidth = width * 3 / 4
        // console.log("baseComponent : ", scheme)
        return StyleSheet.create({
            backgroundVideo: {
                position: 'absolute',
                width: width,
                height: height
            },
            container: {
                // flex: 1,
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: scheme === 'light' ? 'white' : '#1E1F1E',
            },
            backgroundColor: {
                backgroundColor: scheme === 'light' ? 'white' : '#1E1F1E',
            },
            backgroundBW: {
                backgroundColor: scheme === 'light' ? 'white' : 'black',
            },
            scrollView: {
                width: width,
                backgroundColor: scheme === 'light' ? 'white' : '#1E1F1E',
            },
            title: {
                color: scheme === 'light' ? 'black' : 'white',
                fontFamily: 'SukhumvitSet-Bold',
                fontWeight: 'bold'
            },
            titleHeader: {
                color: 'white',
                fontFamily: 'SukhumvitSet-Bold',
                fontWeight: 'bold'
            },
            subTitle: {
                color: scheme === 'light' ? 'black' : 'white',
                fontFamily: 'SukhumvitSet-Medium'
            },
            subTitleGray: {
                color: 'gray',
                fontFamily: 'SukhumvitSet-Medium'
            },
            headerTitle: {
                color: scheme === 'light' ? 'black' : 'white',
                fontSize: 20,
                fontFamily: 'SukhumvitSet-Bold',
                fontWeight: 'bold'
            },
            searchBox: {
                marginTop: 10,
                marginBottom:20,
                marginLeft: 24,
                marginRight: 12,
                paddingVertical:4,
                backgroundColor: scheme == 'light' ? 'white': '#2f2f2f',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1
            },
            textInputView: {
                backgroundColor: '#2e2e2f',
                width: boxWidth,
                borderRadius: 4,
                paddingVertical: 4,
                paddingHorizontal: 24,
                marginTop: 12,
                height: 50,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row'
            },
        })
    }

}


export default BaseComponent;
