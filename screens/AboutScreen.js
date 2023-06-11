import React, { useState } from 'react';
import { ImageBackground, Modal, Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import RenderDonations from '../features/donations/RenderDonations';
import Colors from '../constants/colors';

const AboutScreen = () => {
  const donations = useSelector((state) => state.donations.donationsArray);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const labelStyle = {
    fontSize: 18,
    fontFamily: 'Gaegu'
  };

  return (
    <ImageBackground
      source={require('../assets/images/direction.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.4 }}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.font, styles.title]}>About</Text>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>
            "Our mission is to spread positivity and brighten people's daily
            lives during challenging times. We understand that there are moments
            when we all feel hopeless, but you are never alone. We strive to
            create a community where individuals facing similar struggles can
            find solace and support. Through our app, we encourage everyone to
            share love and compassion by sending uplifting messages. We believe
            that even the smallest acts of kindness can have a profound impact
            on others. Together, let's make a difference and inspire a more
            positive world."
          </Text>
        </View>
        <View>
          <Text style={styles.connect}>- Connect Team</Text>
        </View>
        <View style={styles.donationContainer}>
          <Button
            accessibilityLabel='View donations'
            buttonColor={Colors.color05}
            textColor='#FFF'
            mode='contained'
            onPress={() => {
              handleModalOpen();
              console.log('Pressed');
            }}
            labelStyle={labelStyle}
            style={styles.button}
          >
            Please donate to...
          </Button>
        </View>
      </View>
      <Modal
        transparent={false}
        animationType='slide'
        visible={showModal}
        onRequestClose={handleModalOpen}
      >
        <RenderDonations donations={donations} modalClose={handleModalClose} />
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 20
  },
  font: {
    fontFamily: 'Gaegu'
  },
  titleContainer: {
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aboutContainer: {
    marginBottom: 20
  },
  aboutText: {
    fontFamily: 'Gaegu',
    fontSize: 22,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  title: {
    fontSize: 50,
    marginBottom: 10
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontFamily: 'Crayon',
    fontSize: 20,
    color: 'gray'
  },
  connect: {
    marginLeft: 180,
    fontFamily: 'Qwitcher',
    fontSize: 30
  },
  donationContainer: {
    marginTop: 20
  },
  button: {
    marginBottom: 8,
    borderColor: Colors.color07,
    borderWidth: 3
  }
});

export default AboutScreen;
