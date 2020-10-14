import React from 'react';
import { DeviceEventEmitter, Dimensions, Image, SafeAreaView, Text, TouchableWithoutFeedback, View, ScrollView, TouchableOpacity } from 'react-native';
import { Appearance, useColorScheme } from 'react-native-appearance';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from "react-native-share";
import Video from 'react-native-video';
import Styles from '../../../BaseView/Styles';
import BaseComponent from '../../../Utility/BaseComponent';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen')

class ArticleDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'วางกลยุทธ์อย่างไรในโลกที่คาดเดาไม่ได้ ตอน 2 คิดและทำด้วยคาถา',
            subTitle: 'ใน Podcast The Secret Sauce ตอนนี้ ผมจะมาพูดคุยถึงขั้นตอนวางกลยุทธ์ในเชิงเครื่องมือ หรือ Tools ขั้นตอนเหล่านี้จะช่วยนำทางเราและสามารถนำไปใช้ได้จริงกับทั้งบริษัท และส่วนบุคคล โดยปกติแล้วเมื่อพูดถึงการทำกลยุทธ์ บริษัทต่างๆ มักจะให้เอาคนที่เกี่ยวข้องทั้งหมดมารวมกัน หา Facilitator สักคนเพื่อมาทำ SWOT ด้วยกัน แปะโพสต์อิทไอเดียมากมาย แล้วโหวตให้คะแนนกัน เพราะไม่มีใครกล้าฆ่าไอเดียของคนอื่นๆ ทิ้ง',
            scheme: Appearance.getColorScheme()
        };
    }
    componentDidMount() {
        Appearance.addChangeListener(({ colorScheme }) => {
            this.setState({ scheme: colorScheme })
            console.log("colorScheme : ", colorScheme)
        })
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
                    <Text style={[Styles.title, { marginHorizontal: 20, marginTop:20}]}>
                        {this.state.title}
                    </Text>
                    <Text style={[Styles.title, { marginHorizontal: 20, marginVertical: 10 }]}>
                        {this.state.subTitle}
                    </Text>
                </ScrollView>
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
