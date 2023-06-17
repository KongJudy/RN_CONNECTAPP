import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureScore from 'expo-secure-store';
import Logos from '../constants/logos';
import { ScrollView } from 'react-native';

const RegisterScreen = ({ onBackToLoginClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [remember, setRemember] = useState(false);

  const handleRegister = () => {
    const userInfo = {
      username,
      password,
      firstName,
      lastName,
      remember
    };
    console.log(JSON.stringify(userInfo));
    if (remember) {
      SecureScore.setItemAsync(
        'userinfo',
        JSON.stringify({ username, password })
      ).catch((error) => console.log('Could not save user info', error));
    } else {
      SecureScore.deleteItemAsync('userinfo').catch((error) =>
        console.log('Could not delete user info', error)
      );
    }
  };

  // Style for Buttons
  const labelStyle = {
    color: '#1ACA9E',
    fontSize: 18,
    fontFamily: 'Gaegu',
    letterSpacing: 4
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
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
        <Input
          placeholder='FIRST NAME'
          placeholderTextColor={'#000'}
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          containerStyle={styles.formInput}
          inputContainerStyle={styles.inputStyle}
          leftIconContainerStyle={{ marginLeft: 8, marginRight: 10 }}
          style={styles.inputText}
        />
        <Input
          placeholder='LAST NAME'
          placeholderTextColor={'#000'}
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
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
          accessibilityLabel='Register'
          buttonColor='#000000c4'
          icon={Logos.connectLogo}
          mode='elevated'
          onPress={handleRegister}
          labelStyle={labelStyle}
          style={styles.button}
        >
          Register
        </Button>
        <View
          style={{
            paddingTop: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            accessibilityLabel='Back to Login'
            buttonColor='#292828a4'
            icon={Logos.connectedLogo}
            mode='elevated'
            onPress={onBackToLoginClick}
            labelStyle={labelStyle}
            style={styles.button}
          >
            Back to Login
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    marginTop: 20,
    padding: 20
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

export default RegisterScreen;
