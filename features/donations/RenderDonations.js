import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-paper';
import Colors from '../../constants/colors';

const RenderDonations = ({ donations, modalClose }) => {
  return (
    <ScrollView style={styles.container}>
      {donations.map((donation, idx) => (
        <ListItem key={idx}>
          <ListItem.Content>
            <ListItem.Title
              onPress={() => Linking.openURL(donation.link)}
              style={styles.name}
            >
              {donation.name}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.location}>
              {donation.location}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={styles.description}>
              {donation.description}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={{ alignItems: 'center' }}>
        <Button
          accessibilityLabel='Close View'
          mode='contained'
          buttonColor='#072e2438'
          textColor='#000'
          onPress={modalClose}
          style={styles.closeBtn}
        >
          Close
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3
  },
  name: {
    color: Colors.color01,
    fontFamily: 'FuzzyBubbles',
    fontSize: 22
  },
  location: {
    fontFamily: 'OpenSans-Italic',
    color: Colors.color06
  },
  description: {
    fontFamily: 'Caveat',
    fontSize: 20,
    color: Colors.color07
  },
  closeBtn: {
    marginTop: 2,
    marginBottom: 20,
    borderColor: Colors.color07,
    borderWidth: 3
  }
});

export default RenderDonations;
