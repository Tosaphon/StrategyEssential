import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

function StructResponse(isError, response) {
    return {
        isError: isError,
        response: response
    }
}

async function authentication(callback, username, password) {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    let strFcmToken = await JSON.stringify(fcmToken)
    let usr = username ? username : await AsyncStorage.getItem('username')
    let pass = password ? password : await AsyncStorage.getItem('password')
    let param = {
        username: username ? username : usr,
        password: password ? password : pass,
        fcmToken: strFcmToken,
        version: DeviceInfo.getVersion(),
        platfrom: Platform.OS
    }
    console.log(param)
    axios.post('https://www.strategyessential.app/api/v1/login', param)
        .then(async (response) => {
            await AsyncStorage.setItem('sessionToken', response.data.data.token)
            await getProfile(response.data.data.token, async (profileResult) => {
                await AsyncStorage.setItem('username', usr)
                await AsyncStorage.setItem('password', pass)
                callback(profileResult)
            })
        })
        .catch(function (error) {
            let result = StructResponse(true, error)
            callback(result)
            console.log("authentication : ", result);
        })
}

async function getProfile(token, callback) {
    // console.log('jwtToken : ',token)
    const AuthStr = 'Bearer ' + token
    await axios.get('https://www.strategyessential.app/api/v1/profile', {
        headers: { 'Authorization': AuthStr }
    })
        .then(async function (response) {
            let profile = await JSON.stringify(response.data.data)
            console.log(response.data.data)
            await AsyncStorage.setItem('profile', profile)
            callback(StructResponse(false, response))
        })
        .catch(function (error) {
            callback(StructResponse(false, error))
        });
}

async function getContents(callback) {
    let sessionToken = await AsyncStorage.getItem('sessionToken')
    const AuthStr = 'Bearer ' + sessionToken
    await axios.get('https://www.strategyessential.app/api/v1/content', {
        headers: { 'Authorization': AuthStr }
    })
        .then(async function (response) {
            console.log(response)
            callback(StructResponse(false, response))
        })
        .catch(function (error) {
            callback(StructResponse(false, error))
        });
}


export { authentication, getContents };
