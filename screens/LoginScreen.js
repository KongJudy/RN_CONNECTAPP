import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureScore from 'expo-secure-store';
import Logos from '../constants/logos';

const { height, width } = Dimensions.get('window');

const UserScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  handleLogin = () => {
    console.log('username:', username);
    console.log('password:', password);
    console.log('remember:', remember);
    if (remember) {
      SecureScore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username,
          password
        })
      ).catch((error) => console.log('Could not save user info', error));
    } else {
      SecureScore.deleteItemAsync('userinfo').catch((error) =>
        console.log('Could not delete user info', error)
      );
    }
  };

  useEffect(() => {
    SecureScore.getItemAsync('userinfo').then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        setUsername(userinfo.username);
        setPassword(userinfo.password);
        setRemember(true);
      }
    });
  }, []);

  // Style for Buttons
  const labelStyle = {
    color: '#1ACA9E',
    fontSize: 18,
    fontFamily: 'Gaegu',
    letterSpacing: 4
  };

  return (
    <ImageBackground
      source={require('../assets/images/river-nature.jpg')}
      style={styles.container}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.loginContainer}>
          <Input
            placeholder='USERNAME'
            placeholderTextColor={'#000'}
            leftIcon={{ type: 'ant-design', name: 'user' }}
            onChangeText={(text) => setUsername(text)}
            value={username}
            inputContainerStyle={styles.inputStyle}
            leftIconContainerStyle={{
              marginLeft: 4,
              marginRight: 6
            }}
            style={styles.inputText}
          />
          <Input
            placeholder='PASSWORD'
            placeholderTextColor={'#000'}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            containerStyle={styles.formInput}
            inputContainerStyle={styles.inputStyle}
            leftIconContainerStyle={{ marginLeft: 8, marginRight: 10 }}
            style={styles.inputText}
          />
          <CheckBox
            title='REMEMBER ME'
            center
            checked={remember}
            onPress={() => setRemember(!remember)}
            containerStyle={styles.formCheckbox}
            textStyle={{ color: '#000' }}
            uncheckedColor='#000'
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            accessibilityLabel='Login'
            buttonColor='#ffffffc4'
            icon={Logos.connectLogo}
            mode='elevated'
            onPress={() => console.log('Pressed')}
            labelStyle={labelStyle}
            style={styles.button}
          >
            LOGIN
          </Button>
          <View
            style={{
              paddingTop: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              accessibilityLabel='Login'
              buttonColor='#292828a4'
              icon={Logos.connectedLogo}
              mode='elevated'
              onPress={() => console.log('Pressed')}
              labelStyle={labelStyle}
              style={styles.button}
            >
              REGISTER
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    height: height / 1.4
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.1
  },
  inputText: {
    fontFamily: 'Gaegu',
    fontSize: 20
  },
  inputStyle: {
    borderColor: '#000',
    borderWidth: 1
  },
  formInput: {
    padding: 10
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
    borderWidth: 0,
    width: '50%'
  },
  button: {
    marginBottom: 10,
    width: 300
  }
});

export default UserScreen;
