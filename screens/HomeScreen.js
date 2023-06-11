import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Logos from '../constants/logos';
import { toggleFavorite } from '../features/quotes/favoritesSlice';
import { savePromptEntry } from '../features/prompts/promptsSlice';
import RenderQuote from '../features/quotes/RenderQuote';
import RenderPrompt from '../features/prompts/RenderPrompt';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.quotesArray);
  const favorites = useSelector((state) => state.favorites.favoritesArray);
  const prompts = useSelector((state) => state.prompts.promptsArray);
  const [showPrompt, setShowPrompt] = useState('');
  const [showQuote, setShowQuote] = useState([]);
  const [connect, setConnect] = useState(Logos.connectLogo);

  //prompts
  const randomPrompt = () => {
    if (prompts.length > 0) {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      const newPrompt = prompts[randomIndex];
      setShowPrompt(newPrompt.prompt);
    }
  };

  useEffect(() => {
    if (prompts.length > 0) {
      randomPrompt();
    }
  }, [prompts]);

  const handleAnswer = (text) => {
    dispatch(savePromptEntry(text));
    console.log(text);
  };

  // quotes
  const quoteIsFavorite = (quote) => {
    return favorites.find((favorite) => favorite.quote === quote.quote)
      ? Logos.connectedLogo
      : Logos.connectLogo;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const newQuote = quotes[randomIndex];
        setShowQuote(newQuote);
        setConnect(quoteIsFavorite(newQuote));
      }
    }, 10000);

    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const newQuote = quotes[randomIndex];
      setShowQuote(newQuote);
      setConnect(quoteIsFavorite(newQuote));
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [quotes]);

  const handleFavorite = () => {
    dispatch(toggleFavorite(showQuote));
    if (
      favorites.find(
        (favorite) => (favorite.quote === showQuote) === showQuote.quote
      )
    ) {
      setConnect(Logos.connectLogo);
    } else {
      setConnect(Logos.connectedLogo);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/cityBG.jpg')}
      style={styles.rootContainer}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.quoteContainer}>
        <RenderQuote
          quote={showQuote}
          isFavorite={favorites.find(
            (favorite) => (favorite.quote === showQuote) === showQuote.quote
          )}
          markFavorite={() => dispatch(toggleFavorite(showQuote))}
          connect={connect}
          favorites={favorites}
          handlePress={handleFavorite}
        />
        <View style={styles.promptContainer}>
          <RenderPrompt prompt={showPrompt} onSubmit={handleAnswer} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  quoteContainer: {
    flex: 1
  },
  promptContainer: {
    flex: 1,
    marginTop: 20
  }
});
