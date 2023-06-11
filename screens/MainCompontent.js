import { useState } from 'react';
import Constants from 'expo-constants';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import GameScreen from './GameScreen';
import AboutScreen from './AboutScreen';
import FavoriteScreen from './FavoriteScreen';
import LoginScreen from './LoginScreen';
import { USERS } from '../shared/users';
import { WORDS } from '../shared/words';
import { DONATIONS } from '../shared/donations';

const Tab = createBottomTabNavigator();

const Main = () => {
  const [users, setUsers] = useState(USERS);
  const [currentWord, setCurrentWord] = useState(WORDS);
  const [showWelcome, setShowWelcome] = useState(true);

  const hideScreen = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}
      >
        <WelcomeScreen hideScreen={hideScreen} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopColor: '#2e1670',
            height: 90,
            paddingVertical: 10
          }
        }}
        initialRouteName='Home'
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return <AntDesign name='home' color='#2e1670' size={28} />;
            }
          }}
        />
        <Tab.Screen
          name='Login'
          component={LoginScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return <MaterialIcons name='login' color='#2e1670' size={30} />;
            }
          }}
        />
        <Tab.Screen
          name='Game'
          component={GameScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return <AntDesign name='playcircleo' color='#2e1670' size={28} />;
            }
          }}
        />
        <Tab.Screen
          name='Favorite'
          component={FavoriteScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return (
                <MaterialCommunity
                  name='puzzle-heart-outline'
                  color='#2e1670'
                  size={28}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name='About'
          component={AboutScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return (
                <Entypo name='info-with-circle' color='#2e1670' size={28} />
              );
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Main;
