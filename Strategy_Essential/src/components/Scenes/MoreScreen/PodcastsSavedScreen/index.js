import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, Keyboard, Image, Alert, DeviceEventEmitter } from 'react-native';
import BaseComponent from '../../../Utility/BaseComponent'
import { Appearance, useColorScheme } from 'react-native-appearance';
import Styles from '../../../BaseView/Styles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('screen')

class PodcastsSavedScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            searchBegin: false,
            valueHome: 0,
            valueVideos: 0,
            valuePodcasts: 0,
            valueArticles: 0,
            podcastList: [],
            enableEdit: false,
            scheme: Appearance.getColorScheme()
        }
    }
    componentDidMount() {
        Appearance.addChangeListener(({ colorScheme }) => {
            this.setState({ scheme: colorScheme })
            console.log("colorScheme : ", colorScheme)
        })
        this.loadSavedList()
    }
    async loadSavedList() {
        const podcastSaved = await AsyncStorage.getItem("podcastSaved")
        const json = await JSON.parse(podcastSaved)
        await this.setState({ podcastList: json.podcast })
    }
    editAction = () => {
        this.setState({ enableEdit: !this.state.enableEdit })
    }

    async removePodcastSaved(index) {
        var podcastList = this.state.podcastList
        var removedPodcastList = podcastList.filter((item, i) => i !== index);
        console.log("removedPodcastList : ", removedPodcastList)
        const stringPodcastList = await JSON.stringify({ podcast: removedPodcastList })
        await this.setState({ podcastList: removedPodcastList })
        await AsyncStorage.setItem('podcastSaved', stringPodcastList)
    }

    renderRemoveButton(index) {
        const { scheme } = this.state
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    Alert.alert("Would you like to remove this saved?", "",
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'remove', onPress: () => {
                                    this.removePodcastSaved(index)
                                }
                            }
                        ])
                }}
            >
                <Text
                    style={[this.getStyle(scheme).title, { color: 'red', fontWeight: '800', fontSize: 12 }]}>
                    REMOVE
            </Text>
            </TouchableOpacity>
        )
    }

    renderContentsList() {
        const { scheme, podcastList } = this.state
        const thumnailWidth = width / 3
        const thumbailHeight = thumnailWidth * 9 / 16
        var contentsList = []
        for (var i = 0; i < podcastList.length; i++) {
            contentsList.push(

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { DeviceEventEmitter.emit('navigateToPodcastPlayer') }}
                >
                    <View style={{ width: this.state.width, marginVertical: 10, marginLeft: 16, flexDirection: 'row' }}>
                        <Image
                            style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
                            source={require('../../../../images/mockup/mock_video_thumnail01.png')}
                        />
                        <View style={{ flexDirection: 'column', flex: 1, paddingRight: 16 }}>
                            <Text style={[this.getStyle(scheme).title, {}]}
                                numberOfLines={2}
                            >
                                {podcastList[i].title}
                            </Text>
                            <Text
                                style={[this.getStyle(scheme).subTitleGray, {}]}
                                numberOfLines={1}
                            >
                                {podcastList[i].timeString}
                            </Text>
                        </View>
                        <View style={{ width: 60, marginRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.enableEdit ?
                                this.renderRemoveButton(i) :
                                null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return contentsList
    }


    renderNoPodcastView() {
        const { scheme } = this.state
        const cycleSize = width / 3
        return (
            <View style={[this.getStyle(scheme).container, { alignItems: 'center' }]}>
                <View style={{ width: cycleSize, height: cycleSize, backgroundColor: 'gray', borderRadius: cycleSize, marginTop: 120, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="timeline-plus-outline" color='white' size={width / 5} />
                </View>
                <Text style={[this.getStyle(scheme).title, { marginVertical: 16, marginHorizontal: 32, textAlign: 'center' }]}>
                    {global.l10n.podcastSaveNoPodcastTitleLabel}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.navigateBack()
                        this.props.navigation.navigate('Home')
                    }}
                >
                    <View style={{ borderColor: 'white', borderWidth: 1 }}>
                <Text style={[this.getStyle(scheme).title, { marginVertical: 12, marginHorizontal: 16 }]}>{global.l10n.podcastSaveNoPodcastButtonLabel}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { podcastList, enableEdit, scheme } = this.state
        if (podcastList.length > 0 && podcastList) {
            return (
                <View style={this.getStyle().container}>
                    {this.renderHeader(global.l10n.podcastSaveTitleLabel, this.editAction, this.state.enableEdit)}
                    {this.renderFooter()}
                    <ScrollView
                        style={{ flex: 1, width: width }}
                        onTouchStart={() => { this.setState({ searchBegin: false }) }}
                        onScrollBeginDrag={() => {
                            this.setState({ searchBegin: false })
                            Keyboard.dismiss(0)
                        }}
                    >
                        {this.renderContentsList()}

                    </ScrollView>

                </View>
            );
        } else {
            return (
                <View style={this.getStyle().container}>
                    {this.renderHeader(global.l10n.podcastSaveTitleLabel)}
                    {this.renderFooter()}
                    {this.renderNoPodcastView()}
                </View>
            )
        }

    }
}

export default PodcastsSavedScreen;
