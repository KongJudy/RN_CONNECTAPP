import { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Logos from '../constants/logos';
import Colors from '../constants/colors';

const WelcomeScreen = ({ hideScreen }) => {
  const [currentIcon, setCurrentIcon] = useState(Logos.connectLogo);

  const handleIconChange = () => {
    setCurrentIcon(Logos.connectedLogo);
    hideScreen();
  };

  const bgImg = require('../assets/images/purpleBG.jpg');

  return (
    <LinearGradient
      colors={[Colors.color02, Colors.color05, Colors.color05]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={bgImg}
        style={styles.imageContainer}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.text}>Welcome</Text>
            <Text style={styles.text}>to</Text>
            <Text style={[styles.text, styles.title]}>Connect</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleIconChange} style={styles.button}>
              <Text style={[styles.text, styles.enterText]}>Enter</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  imageContainer: {
    flex: 1
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200
  },
  text: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 40,
    textShadowColor: Colors.color03,
    textShadowRadius: 10,
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Crayon',
    marginTop: 20,
    fontSize: 80,
    color: '#fff'
  },

  buttonContainer: {
    marginTop: 60
  },
  logo: {
    height: 30,
    width: 30,
    marginBottom: 4
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    width: 140,
    borderRadius: 14,
    shadowColor: Colors.color06,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 }
  },
  enterText: {
    fontFamily: 'Gaegu',
    fontSize: 24,
    lineHeight: 38,
    color: 'black',
    textShadowColor: 'gray',
    textShadowRadius: 2
  }
});

export default WelcomeScreen;
