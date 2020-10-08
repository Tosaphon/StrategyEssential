import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Video from 'react-native-video';

import Styles from '../../BaseView/Styles';
import BaseComponent from '../../Utility/BaseComponent'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
const { width, height } = Dimensions.get('screen')

class DownloadsScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit: false,
      fill: 0,
      destinationPath: "",
      downloadedVideo: ['', '', '', ''],
      downloadedPodcast: ['', '', '', '']
    };
    // this.startDownload()
  }

  async startDownload() {
    const destination = RNBackgroundDownloader.directories.documents + '/file.mp4'
    console.log('destination : ', destination)
    let task = RNBackgroundDownloader.download({
      id: 'file123',
      url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      destination: destination
    }).begin((expectedBytes) => {
      console.log(`Going to download ${expectedBytes} bytes!`);
    }).progress((percent) => {
      this.setState({ fill: parseInt(percent) * 100 })
    }).done(() => {
      this.setState({ fill: 100 })
      this.setState({ destinationPath: destination })
      console.log('Download is done!');
    }).error((error) => {
      console.log('Download canceled due to error: ', error);
    });
  }
  getProgressCircular() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => { }}
      >
        <AnimatedCircularProgress
          size={40}
          width={3}
          fill={this.state.fill}
          tintColor="white"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <Text style={Styles.title}>
                {this.state.fill}
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </TouchableOpacity>
    )
  }

  renderRemoveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => { }}
      >
        <Text
          style={[Styles.title, { color: 'red', fontWeight: '800', fontSize: 12 }]}>
          REMOVE
        </Text>
      </TouchableOpacity>
    )
  }

  renderContentsList() {
    const thumnailWidth = width / 3
    const thumbailHeight = thumnailWidth * 9 / 16
    var contentsList = []
    for (var i = 0; i < 10; i++) {
      contentsList.push(
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.setState({ fill: this.state.fill + 10 })
          }}
        >
          <View style={{ width: this.state.width, marginVertical: 10, marginLeft: 16, flexDirection: 'row' }}>
            <Image
              style={{ width: thumnailWidth, height: thumbailHeight, backgroundColor: 'white', marginRight: 10 }}
              source={require('../../../images/mockup/mock_video_thumnail01.png')}
            />
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={[Styles.title, {}]}>
                TITLE
              </Text>
              <Text style={[Styles.title, {}]}>
                SUBTITLE
              </Text>
              <Text style={[Styles.title, {}]}>
                DATE TIME
              </Text>
            </View>
            <View style={{ width: 60, marginRight: 16, justifyContent: 'center', alignItems: 'center' }}>
              {this.state.enableEdit ?
                this.renderRemoveButton() :
                this.state.fill < 100 ?
                  this.getProgressCircular() :
                  <MaterialIcons name="done" color='green' size={30} />
              }
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return contentsList
  }

  renderNoVideoView() {
    const cycleSize = width / 3
    return (
      <View style={[Styles.container, { alignItems: 'center' }]}>
        <View style={{ width: cycleSize, height: cycleSize, backgroundColor: 'gray', borderRadius: cycleSize, marginTop: 120, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="file-download" color='white' size={width / 4} />
        </View>
        <Text style={[Styles.title, { marginVertical: 16, marginHorizontal: 32, textAlign: 'center' }]}>
          You can download all contents such as videos or podcasts for see it later with offline mode
          </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        >
          <View style={{ borderColor: 'white', borderWidth: 1 }}>
            <Text style={[Styles.title, { marginVertical: 12, marginHorizontal: 16 }]}>FIND MORE TO DOWNLAOD</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderFineMoreToDownload() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => { }}
      >
        <View style={{ borderColor: 'white', borderWidth: 1 }}>
          <Text style={[Styles.title, { marginVertical: 12, marginHorizontal: 16 }]}>FIND MORE TO DOWNLAOD</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderVideoList() {
    var videoList = []
    for (var i = 0; i < this.state.downloadedVideo.length; i++) {
      videoList.push(

      )
    }
  }

  render() {
    const { enableEdit } = this.state
    // return this.renderNoVideoView()
    return (
      <SafeAreaView style={Styles.container}>
        <View
          style={{ width: width, alignItems: 'flex-end' }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.setState({ enableEdit: !enableEdit })
            }}
          >
            {enableEdit ?
              <Text style={[Styles.title, { marginRight: 16, height: 26 }]}>
                Done
              </Text>
              :
              <MaterialIcons style={{ marginRight: 16 }} name="edit" color='white' size={26} />
            }

          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1, width: width }}
        >
          <Text style={[Styles.title, { marginLeft: 16 }]}>
            Videos
            </Text>
          {this.renderContentsList()}
          <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
            {this.renderFineMoreToDownload()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default DownloadsScreen;
