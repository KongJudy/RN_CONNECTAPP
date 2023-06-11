import { useState } from 'react';
import Constants from 'expo-constants';
import { Platform, View } from 'react-native';
import { USERS } from '../shared/users';
import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';

const Main = () => {
  const [users, setUsers] = useState(USERS);
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

  return <HomeScreen users={users} />;
};

export default Main;
