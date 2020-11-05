import * as React from 'react';
import { Button, Text, View, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FirstScreen from '../components/Scenes/OnboardingScreen/Onboarding/firstScreen'
import SecondScreen from '../components/Scenes/OnboardingScreen/Onboarding/secondScreen'
import ThirdScreen from '../components/Scenes/OnboardingScreen/Onboarding/thirdScreen'
import SigninScreen from '../components/Scenes/OnboardingScreen/Signin/'
import RegistrationScreen from '../components/Scenes/OnboardingScreen/Registration'
import OTPConfirmationScreen from '../components/Scenes/OnboardingScreen/OTPConfirmation'
import ConsentsScreen from '../components/Scenes/OnboardingScreen/Consent'

const NavigationStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator()

function SigninStackScreen() {
    return (
        <NavigationStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <NavigationStack.Screen name="SigninScreen" component={SigninScreen} />
        </NavigationStack.Navigator>
    );
}


function OnboardingSlide() {
    return (
        <TopTab.Navigator
            initialRouteName="FirstScreen"
            tabBarOptions={{
                showLabel: false,
                showIcon: false,
                inactiveTintColor: 'black',
                indicatorStyle: { backgroundColor: 'transparent', },
                style: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    elevation: 0
                },
            }}
        >
            <TopTab.Screen name="FirstScreen" component={FirstScreen} options={{ title: 'FirstScreen' }} />
            <TopTab.Screen name="SecondScreen" component={SecondScreen} options={{ title: 'SecondScreen' }} />
            <TopTab.Screen name="ThirdScreen" component={ThirdScreen} options={{ title: 'ThirdScreen' }} />
        </TopTab.Navigator>

    );
}


function OnboardingNavigationStack() {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = getActiveRouteName(state);

                if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    });
                }
            }}
        >
            <NavigationStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <NavigationStack.Screen name="OnboardingSlide" component={OnboardingSlide} />
                <NavigationStack.Screen name="SigninStackScreen" component={SigninStackScreen} />
                <NavigationStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <NavigationStack.Screen name="OTPConfirmationScreen" component={OTPConfirmationScreen} />
                <NavigationStack.Screen name="ConsentsScreen" component={ConsentsScreen} />
            </NavigationStack.Navigator>
        </NavigationContainer>
    )
}

export default function OnboardingStack() { return OnboardingNavigationStack() }