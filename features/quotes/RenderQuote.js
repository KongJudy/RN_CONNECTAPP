import { useRef } from 'react';
import { Card } from 'react-native-paper';
import { Alert, PanResponder, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Image } from 'react-native-elements';

const RenderQuote = (props) => {
  const { quote, connect, handlePress } = props;

  const view = useRef();

  const isLeftSwipe = ({ dx }) => dx < -200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? 'finished' : 'canceled')
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (isLeftSwipe(gestureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add the quote by ' +
            quote.author +
            ' to favorites?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => console.log('Cancel Pressed')
            },
            {
              text: 'OK',
              onPress: () =>
                props.isFavorite
                  ? console.log('Already set as a favorite')
                  : props.markFavorite()
            }
          ],
          { cancelable: false }
        );
      }
    }
  });

  if (!quote) {
    return null;
  }

  return (
    <>
      <Animatable.View
        animation='fadeInDownBig'
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card style={styles.cardContainer} />
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{quote.quote}</Text>
        </View>
        <View style={styles.authorFavContainer}>
          <Text style={styles.author}>{quote.author}</Text>
          <Image
            source={connect}
            style={[{ width: 24, height: 24 }, styles.icon]}
            type='font-awesome'
            color='#f50'
            raised
            reverse
            onPress={handlePress}
          />
        </View>
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 370,
    height: 260,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.01
  },

  quoteContainer: {
    flex: 1,
    position: 'absolute',
    top: '20%',
    paddingHorizontal: 20,
    marginTop: 20
  },
  quote: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 6,
    fontFamily: 'Gaegu',
    fontSize: 24,
    textAlign: 'center',
    alignItems: 'center'
  },
  authorFavContainer: {
    borderRadius: 10,
    backgroundColor: '#0000008c',
    padding: 2,
    paddingLeft: 22,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20
  },
  author: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 6,
    fontFamily: 'Gaegu',
    fontSize: 22
  },
  icon: {
    marginLeft: 10,
    marginBottom: 4,
    marginRight: 20
  }
});

export default RenderQuote;
