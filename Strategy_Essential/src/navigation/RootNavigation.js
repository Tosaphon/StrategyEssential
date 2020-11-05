import * as React from 'react';
import { Button, Text, View, Platform, DeviceEventEmitter } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from './SplashScreen'
import HomeScreen from '../components/Scenes/HomeScreen'
import DetailScreen from '../components/Scenes/HomeScreen/DetailScreen'
import VideosScreen from '../components/Scenes/HomeScreen/VideosScreen'
import PodcastsScreen from '../components/Scenes/HomeScreen/PodcastsScreen'
import ArticlesScreen from '../components/Scenes/HomeScreen/ArticlesScreen'
import PodcastsPlayer from '../components/Scenes/HomeScreen/DetailScreen/podcastPlayer'
import ArticleDetail from '../components/Scenes/HomeScreen/DetailScreen/articleDetail'
import VideoFullScreen from '../components/Scenes/HomeScreen/DetailScreen/videoFullScreen'

import SearchScreen from '../components/Scenes/SearchScreen'
import DownloadsScreen from '../components/Scenes/DownloadsScreen'
import MoreScreen from '../components/Scenes/MoreScreen'
import FeedScreen from '../components/Scenes/FeedScreen'
import AppSettingScreen from '../components/Scenes/MoreScreen/AppSetting'
import InboxScreen from '../components/Scenes/MoreScreen/InboxScreen'
import WishListScreen from '../components/Scenes/MoreScreen/WishListScreen'
import HelpScreen from '../components/Scenes/MoreScreen/HelpScreen'
import PodcastsSavedScreen from '../components/Scenes/MoreScreen/PodcastsSavedScreen'

const NavigationStack = createStackNavigator();
const TabBottom = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator()
var colorScheme = ''

const trasitionConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const darkThemeAppearance = {
  active: 'white',
  inActive: 'gray'
}

const defaultThemeAppearance = {
  active: 'black',
  inActive: 'gray'
}

function SplashStackScreen() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NavigationStack.Screen name="SplashScreen" component={SplashScreen} />
    </NavigationStack.Navigator>
  );
}

function HomeStackTopTab() {
  const insets = useSafeAreaInsets();
  const scheme = colorScheme
  return (
    <TopTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontFamily: 'SukhumvitSet-Bold', color: scheme == 'light' ? 'black' : 'white' },
        tabStyle: { width: 100 },
        scrollEnabled: true,
        style: {
          backgroundColor: scheme == 'light' ? 'white' : 'black',
          marginTop: insets.top,
          // position: 'absolute',
          left: 0,
          right: 0,
          elevation: 0
        },
      }}
    >
      <TopTab.Screen name="HomeScreen" component={HomeScreen} options={{ title: global.l10n.homeTopTabbar }} />
      <TopTab.Screen name="VideosScreen" component={VideosScreen} options={{ title: global.l10n.videoTopTabbar }} />
      <TopTab.Screen name="PodcastsScreen" component={PodcastsScreen} options={{ title: global.l10n.podcastTopTabbar }} />
      <TopTab.Screen name="ArticlesScreen" component={ArticlesScreen} options={{ title: global.l10n.articleTopTabbar }} />
      <TopTab.Screen name="FeedScreen" component={FeedScreen} options={{ title: global.l10n.feedTopTabbar }} />
    </TopTab.Navigator>

  );
}

function HomeStackScreen() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid
      }}
    >
      <NavigationStack.Screen name="HomeStackTopTab" component={HomeStackTopTab} />
      <NavigationStack.Screen name="ContentsDetailNavigation" component={ContentsDetailNavigation} />
      <NavigationStack.Screen name="ArticleDetail" component={ArticleDetail} />
      <NavigationStack.Screen name="VideoFullScreen" component={VideoFullScreen} />
    </NavigationStack.Navigator>
  );
}

function InboxStackScreen() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid
      }}
    >
      <NavigationStack.Screen name="InboxScreen" component={InboxScreen} />
      <NavigationStack.Screen name="ContentsDetailNavigation" component={ContentsDetailNavigation} />
      <NavigationStack.Screen name="ArticleDetail" component={ArticleDetail} />
      <NavigationStack.Screen name="VideoFullScreen" component={VideoFullScreen} />
    </NavigationStack.Navigator>
  );
}

function ContentsDetailNavigation() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid
      }}
    >
      <NavigationStack.Screen name="DetailScreen" component={DetailScreen} />
      <NavigationStack.Screen name="PodcastsPlayer" component={PodcastsPlayer} />
    </NavigationStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NavigationStack.Screen name="SearchScreen" component={SearchScreen} />
      <NavigationStack.Screen name="ContentsDetailNavigation" component={ContentsDetailNavigation} />
      <NavigationStack.Screen name="ArticleDetail" component={ArticleDetail} />
    </NavigationStack.Navigator>
  );
}
function DownloadsStackScreen() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NavigationStack.Screen name="DownloadScreen" component={DownloadsScreen} />
      <NavigationStack.Screen name="ContentsDetailNavigation" component={ContentsDetailNavigation} />
      <NavigationStack.Screen name="ArticleDetail" component={ArticleDetail} />
    </NavigationStack.Navigator>
  );
}
function MoreStackScreen() {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <NavigationStack.Screen name="SettingScreen" component={MoreScreen} options={{ title: 'Setting' }} />
      <NavigationStack.Screen name="AppSettingScreen" component={AppSettingScreen} />
      <NavigationStack.Screen name="HelpScreen" component={HelpScreen} />
      <NavigationStack.Screen name="WishListScreen" component={WishListScreen} />
      <NavigationStack.Screen name="ContentsDetailNavigation" component={ContentsDetailNavigation} />
      <NavigationStack.Screen name="ArticleDetail" component={ArticleDetail} />
      <NavigationStack.Screen name="PodcastsSavedScreen" component={PodcastsSavedScreen} />
    </NavigationStack.Navigator>
  );
}


function MobileRootStack() {
  const scheme = colorScheme
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === 'light' ? DefaultTheme : DarkTheme}
        ref={navigationRef}
        onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = navigationRef.current.getCurrentRoute().name
          let message = "analytics : { currentRouteName: " + currentRouteName + " , previousRouteName: " + previousRouteName + " }"
          console.log(message)
          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
        }}
      >
        <TabBottom.Navigator
          tabBarOptions={{
            activeTintColor: scheme === 'light' ? defaultThemeAppearance.active : darkThemeAppearance.active,
            inactiveTintColor: scheme === 'light' ? defaultThemeAppearance.inActive : darkThemeAppearance.inActive,
            style: {
              borderTopColor: scheme === 'light' ? 'white' : 'black',
            },
            labelStyle: { fontFamily: 'SukhumvitSet-Bold' }
          }}
        >
          <TabBottom.Screen
            options={{
              tabBarLabel: global.l10n.homeTabbar,
              tabBarIcon: ({ color }) => (
                <Octicons name="home" color={color} size={26} />
              ),
            }}
            name="Home"
            component={HomeStackScreen} />
          <TabBottom.Screen
            options={{
              tabBarBadge: 10,
              tabBarLabel: global.l10n.inboxTabbar,
              tabBarIcon: ({ color }) => (
                <Feather name="inbox" color={color} size={26} />
              ),
            }}
            name="Inbox" component={InboxStackScreen} />
          <TabBottom.Screen
            options={{
              tabBarLabel: global.l10n.searchTabbar,
              tabBarIcon: ({ color }) => (
                <Feather name="search" color={color} size={26} />
              ),
            }}
            name="Search" component={SearchStackScreen} />
          <TabBottom.Screen
            options={{
              tabBarLabel: global.l10n.downloadTabbar,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="download" color={color} size={26} />
              ),
            }}
            name="Downloads" component={DownloadsStackScreen} />
          <TabBottom.Screen
            options={{
              tabBarLabel: global.l10n.moreTabbar,
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-menu" color={color} size={26} />
              ),
            }}
            name="More" component={MoreStackScreen} />
        </TabBottom.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default function RootStack({ scheme }) {
  colorScheme = scheme
  return MobileRootStack()
}

//https://reactnavigation.org/docs/auth-flow/#define-our-screens