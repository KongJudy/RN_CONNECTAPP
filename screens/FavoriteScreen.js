import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/quotes/favoritesSlice';
import Loading from '../components/LoadingComponent';

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const { quotesArray } = useSelector((state) => state.quotes);
  const favorites = useSelector((state) => state.favorites.favoritesArray);

  const favoriteQuotes = favorites
    .map((favorite) => {
      const quote = quotesArray.find((quote) => quote.quote === favorite.quote);
      return { ...quote, timestamp: favorite.timestamp };
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const renderFavoriteItem = ({ item: quote }) => {
    const formatTimestamp = new Date(quote.timestamp).toLocaleString();

    return (
      <SwipeRow rightOpenValue={-100}>
        <View style={styles.deleteView}>
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() =>
              Alert.alert(
                'Delete Favorite?',
                'Are you sure you wish to remove the quote from your favorites?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log(quote + 'Not Deleted'),
                    style: 'cancel'
                  },
                  {
                    text: 'OK',
                    onPress: () => dispatch(toggleFavorite(quote))
                  }
                ],
                { cancelable: true }
              )
            }
          >
            <Text style={styles.deleteText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ListItem
            containerStyle={{
              borderColor: 'black',
              borderWidth: 0.5
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.text}>{quote.quote}</ListItem.Title>
              <ListItem.Subtitle style={[styles.text, styles.author]}>
                {quote.author}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.timestamp}>
                {formatTimestamp}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </SwipeRow>
    );
  };

  if (favorites.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteQuotes}
        renderItem={renderFavoriteItem}
        keyExtractor={(quote) =>
          `${quote.quote}-${quote.author}-${quote.timestamp}`
        }
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  flatList: {
    backgroundColor: 'transparent' // Make the FlatList background transparent
  },
  text: {
    fontFamily: 'FuzzyBubbles',
    fontSize: 16,
    color: 'black',
    textShadowColor: 'gray',
    textShadowRadius: 2
  },
  author: {
    marginTop: 10
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginLeft: 20,
    marginBottom: 2
  },
  deleteView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  deleteTouchable: {
    backgroundColor: '#1ACA9E',
    height: '100%',
    justifyContent: 'center'
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'FuzzyBubbles',
    fontSize: 20,
    width: 100
  }
});

export default FavoriteScreen;
