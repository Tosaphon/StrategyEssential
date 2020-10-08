import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, DeviceEventEmitter } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Styles from "../BaseView/Styles";
import LoadingView from "../BaseView/LoadingView";

import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen')

class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.renderHeader = this.renderHeader.bind(this)
        this.navigateBack = this.navigateBack.bind(this)
        this.renderLoadingView = this.renderLoadingView.bind(this)
        this.renderHeaderBG = this.renderHeaderBG.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.navigateToContentsDetail = this.navigateToContentsDetail.bind(this)
        this.getStyle = this.getStyle.bind(this)
        // this.eventListener = DeviceEventEmitter.addListener('navigateToPodcastDetail', this.navigateToPodcastDetail);
    }

    navigateBack = async () => {
        await this.props.navigation.goBack()
    }
    navigateToContentsDetail = () => {
        this.props.navigation.navigate('ContentsDetailNavigation')
    }
    navigateToPodcastDetail = () => {
        this.props.navigation.navigate('ContentsDetailNavigation', { screen: 'PodcastsPlayer' })
    }
    renderLoadingView(visible) {
        return <LoadingView visible={visible} />
    }

    renderHeader(title, navigateBack) {
        return (
            <View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
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
                        }}
                        onPress={() => { navigateBack() }}
                    >
                        <Ionicons name="chevron-back" color='white' size={26} />
                    </TouchableOpacity>

                    <Text style={[Styles.title, { width: width - 60, textAlign: 'center', fontSize: 20 }]}>{title}</Text>
                </SafeAreaView>
            </View>
        )
    }
    renderHeaderBG() {
        return (
            <View style={{
                width: width,
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                position: 'absolute'
            }}>
                <LinearGradient
                    colors={[
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,8)',
                        'rgba(0, 0, 0,0)',
                    ]}
                    style={{
                        width: '100%',
                        height: 100,
                        overflow: 'visible',
                    }} />
            </View>
        )
    }
    renderFooter() {
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

    getStyle(scheme) {
        const { width, height } = Dimensions.get('screen')
        const boxWidth = width * 3 / 4
        console.log("baseComponent : ", scheme)
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
            title: {
                color: 'white',
                fontFamily: 'SukhumvitSet-Bold'
            },
            subTitle: {
                color: 'white',
                fontFamily: 'SukhumvitSet-Medium'
            },
            subTitleGray: {
                color: 'gray',
                fontFamily: 'SukhumvitSet-Medium'
            },
            headerTitle: {
                color: 'white',
                fontSize: 20
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
