import { useState, useEffect } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reportWord } from '../features/words/reportsSlice';
import RenderLeaders from '../features/users/RenderLeaders';
import RenderWramble from '../features/words/RenderWramble';
import Colors from '../constants/colors';
import { fetchRandomWord } from '../features/words/wordsSlice';

const GameScreen = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const word = useSelector((state) => state.words.wordsArray);
  const [selectedWord, setSelectedWord] = useState('');
  const [score, setScore] = useState(0);
  const [wramble, setWramble] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [wrambleState, setWrambleState] = useState([]);
  const [wordState, setWordState] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);

  useEffect(() => {
    if (word.length > 0) {
      const newWord = word[0].toUpperCase();
      setSelectedWord(newWord);
      setWramble(newWord.split('').sort(() => Math.random() - 0.7));
      setWrambleState(newWord.split(''));
      setWordState(new Array(newWord.length).fill(''));
    }
  }, [word]);

  const handleSubmit = () => {
    if (wordState.join('') === selectedWord) {
      Alert.alert(
        'Great Job!',
        `You guessed correctly!\nThe word was ${selectedWord}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              nextRound();
              setScore((currentState) => {
                const newState = currentState + 1;
                console.log(newState);
                return newState;
              });
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Sorry,',
        `${wordState.join('')} is not the word.\nTry Again.`,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            }
          }
        ]
      );
    }
    console.log('submitted');
  };

  const handleReset = () => {
    const shuffledWramble = [...wramble].sort(() => Math.random() - 0.5);

    setDisabledLetters([]);
    setWordState(Array(selectedWord.length).fill(null));
    setWrambleState([]);
    setSelectedLetter(null);
    setSelectedBlock(null);
    setWramble(shuffledWramble);
  };

  const nextRound = () => {
    setSelectedWord('');
    setSelectedLetter(null);
    setSelectedBlock(null);
    setWrambleState([]);
    setWordState([]);
    setDisabledLetters([]);

    dispatch(fetchRandomWord())
      .then((response) => {
        const newWord = response.payload.toUpperCase();
        setSelectedWord(newWord);
        setWramble(newWord.split('').sort(() => Math.random() - 0.5));
        setWrambleState(newWord.split(''));
        setWordState(new Array(newWord.length).fill(''));
        console.log(newWord);
      })
      .catch((error) => {
        console.log('Failed to fetch random word:', error.message);
      });
  };

  const handleReport = () => {
    dispatch(reportWord(selectedWord))
      .then(() => {
        console.log('Reported');
      })
      .catch((error) => {
        console.log('Failed to report word:', error.message);
      });
  };

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
      <View style={styles.gameTextContainer}>
        <Text style={styles.gameTitle}>unscramble the wramble</Text>
      </View>
      <View style={styles.leaderContainer}>
        <TouchableOpacity style={styles.leaderboardButton} onPress={openModal}>
          <Text style={styles.leaderboardButtonText}>LEADERBOARD</Text>
        </TouchableOpacity>
        <Modal
          animationType='slide'
          visible={modalOpen}
          onRequestClose={closeModal}
        >
          <RenderLeaders closeModal={closeModal} />
        </Modal>
      </View>
      <View style={styles.renderWrambleContainer}>
        <RenderWramble
          word={selectedWord}
          wramble={wramble}
          score={score}
          report={handleReport}
          nextRound={nextRound}
          wrambleState={wrambleState}
          wordState={wordState}
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
          setWrambleState={setWrambleState}
          setWordState={setWordState}
          handleSubmit={handleSubmit}
          disabledLetters={disabledLetters}
          setDisabledLetters={setDisabledLetters}
          handleReset={handleReset}
          handleReport={handleReport}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  leaderContainer: {
    marginTop: 10,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 10
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
  },
  gameTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'FuzzyBubbles',
    color: '#FFF',
    paddingRight: 4,
    marginLeft: 4,
    top: '10%',
    textShadowColor: '#292929',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 200
  },
  renderWrambleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '23%'
  }
});

export default GameScreen;
