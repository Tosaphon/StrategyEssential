import React from 'react';
import { DeviceEventEmitter, Dimensions, Image, SafeAreaView, Text, TouchableWithoutFeedback, View, ScrollView, TouchableOpacity } from 'react-native';
import { Appearance, useColorScheme } from 'react-native-appearance';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from "react-native-share";
import Styles from '../../../BaseView/Styles';
import BaseComponent from '../../../Utility/BaseComponent';
const { width, height } = Dimensions.get('screen')

class ArticleDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา',
            subTitle: 'ใน Podcast The Secret Sauce ตอนนี้ ผมจะมาพูดคุยถึงขั้นตอนวางกลยุทธ์ในเชิงเครื่องมือ หรือ Tools ขั้นตอนเหล่านี้จะช่วยนำทางเราและสามารถนำไปใช้ได้จริงกับทั้งบริษัท และส่วนบุคคล โดยปกติแล้วเมื่อพูดถึงการทำกลยุทธ์ บริษัทต่างๆ มักจะให้เอาคนที่เกี่ยวข้องทั้งหมดมารวมกัน หา Facilitator สักคนเพื่อมาทำ SWOT ด้วยกัน แปะโพสต์อิทไอเดียมากมาย แล้วโหวตให้คะแนนกัน เพราะไม่มีใครกล้าฆ่าไอเดียของคนอื่นๆ ทิ้ง',
            scheme: Appearance.getColorScheme(),
            isBookmark: false,
            isRate: false
        };
    }
    componentDidMount() {
        Appearance.addChangeListener(({ colorScheme }) => {
            this.setState({ scheme: colorScheme })
            console.log("colorScheme : ", colorScheme)
        })
    }
    renderActionButton() {
        const { isBookmark, isRate } = this.state
        return (
            <View style={{ width: width, flexDirection: 'row', marginRight: 40, marginVertical: 20 ,justifyContent:'flex-end'}}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                    onPress={() => {
                        this.setState({ isBookmark: !isBookmark })
                    }}
                >
                    {isBookmark ?
                        <FontAwesome name="bookmark" color='white' size={24} />
                        :
                        <FontAwesome name="bookmark-o" color='white' size={24} />
                    }
                    <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>My List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                    onPress={() => {
                        this.setState({ isRate: !isRate, isShowRating: true })
                    }}
                >
                    <AntDesign name={isRate ? "like1" : "like2"} color='white' size={30} />
                    <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
                    onPress={() => {
                        const options = {
                            title: 'Share via',
                            message: this.state.title,
                            url: 'some share url',
                            filename: 'test', // only for base64 file in Android
                        };
                        Share.open(options)
                            .then((res) => { console.log(res) })
                            .catch((err) => { err && console.log(err); });
                    }}
                >
                    <FontAwesome5 name="share" color='white' size={30} />
                    <Text style={[Styles.title, { fontSize: 10, marginTop: 5 }]}>Share</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { scheme } = this.state
        return (
            <View style={this.getStyle(scheme).container}>
                <ScrollView>
                    <SafeAreaView>
                        <View style={{ width: width }}>
                            <Image
                                style={{ width: width, height: width * 9 / 16 }}
                                source={require('../../../../images/mockup/mock_video_thumnail01.png')}
                            />
                        </View>
                    </SafeAreaView>
                    <Text style={[Styles.title, { marginHorizontal: 20, marginTop: 20, fontSize: 18 }]}>
                        {this.state.title}
                    </Text>
                    <Text style={[Styles.subTitle, { marginHorizontal: 20, marginVertical: 10 }]}>
                        {this.state.subTitle}
                    </Text>
                </ScrollView>
                {this.renderActionButton()}
                <SafeAreaView style={{ position: 'absolute', left: 24 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.navigateBack()
                        }}
                    >
                        <Ionicons name="arrow-back-circle" color='white' size={30} />
                    </TouchableOpacity>
                </SafeAreaView>
            </View >
        );
    }
}

export default ArticleDetail;
