
import { StyleSheet, Dimensions } from 'react-native';
// import { useColorScheme } from 'react-native-appearance';

const { width, height } = Dimensions.get('screen')
const boxWidth = width * 3 / 4

function createStyle() {
    // const scheme = useColorScheme()
    // console.log("scheme : ", scheme)
    const Styles = StyleSheet.create({
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
            backgroundColor: '#1E1F1E'
            // backgroundColor: scheme === 'dark' ? 'black' : 'white',
        },
        title: {
            color: 'white',
            fontFamily:'SukhumvitSet-Bold'
        },
        subTitle: {
            color: 'white',
            fontFamily:'SukhumvitSet-Medium'
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
    return Styles
}


export default createStyle();
