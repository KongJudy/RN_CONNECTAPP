import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import Colors from '../constants/colors';

const GameScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ImageBackground
      source={require('../assets/images/mountainBG.jpg')}
      style={styles.rootContainer}
      imageStyle={{ opacity: 0.8 }}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.leaderboardButton} onPress={openModal}>
          <Text style={styles.leaderboardButtonText}>LEADERBOARD</Text>
        </TouchableOpacity>
        <Modal
          animationType='slide'
          visible={modalOpen}
          onRequestClose={closeModal}
        ></Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leaderboardButton: {
    backgroundColor: Colors.color07,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  leaderboardButtonText: {
    color: 'white',
    fontFamily: 'Gaegu',
    fontSize: 20
  }
});

export default GameScreen;
