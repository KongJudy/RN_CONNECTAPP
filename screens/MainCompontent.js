import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import { Platform, View, StyleSheet } from 'react-native';
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
import { fetchDonations } from '../features/donations/donationsSlice';
import { fetchQuotes } from '../features/quotes/quotesSlice';
import { fetchRandomWord } from '../features/words/wordsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchPrompts } from '../features/prompts/promptsSlice';
import { reportWord } from '../features/words/reportsSlice';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRandomWord());
    dispatch(fetchQuotes());
    dispatch(reportWord());
    dispatch(fetchDonations());
    dispatch(fetchPrompts());
  }, [dispatch]);

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
            backgroundColor: Colors.color01,
            height: 80,
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
              return (
                <View style={styles.navIconView}>
                  <AntDesign
                    style={{ marginBottom: 4 }}
                    name='home'
                    color='#2e1670'
                    size={28}
                  />
                </View>
              );
            }
          }}
        />
        <Tab.Screen
          name='Login'
          component={LoginScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return (
                <View style={styles.navIconView}>
                  <MaterialIcons
                    style={{ marginBottom: 4 }}
                    name='login'
                    color='#2e1670'
                    size={30}
                  />
                </View>
              );
            }
          }}
        />
        <Tab.Screen
          name='Game'
          component={GameScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => {
              return (
                <View style={styles.navIconView}>
                  <AntDesign
                    style={{ marginBottom: 2 }}
                    name='playcircleo'
                    color='#2e1670'
                    size={28}
                  />
                </View>
              );
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
                <View style={styles.navIconView}>
                  <MaterialCommunity
                    style={{ marginBottom: 4 }}
                    name='puzzle-heart-outline'
                    color='#2e1670'
                    size={28}
                  />
                </View>
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
                <View style={styles.navIconView}>
                  <Entypo
                    style={{ marginBottom: 2 }}
                    name='info-with-circle'
                    color='#2e1670'
                    size={28}
                  />
                </View>
              );
            }
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  navIconView: {
    backgroundColor: '#d3e2ddb0',
    borderRadius: 30,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#00000027',
    borderWidth: 3
  }
});

export default Main;
