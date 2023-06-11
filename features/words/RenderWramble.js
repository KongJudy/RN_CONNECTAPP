import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import Colors from '../../constants/colors';

const RenderWramble = (props) => {
  const {
    word,
    wramble,
    wrambleState,
    wordState,
    setSelectedLetter,
    setSelectedBlock,
    setWrambleState,
    setWordState
  } = props;
  const [disabledLetters, setDisabledLetters] = useState([]);

  const wrambleBlocks = () => {
    const letterCounts = {}; // Object to store the count of each letter
    wramble.forEach((letter) => {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1; // Increment the count of each letter
    });

    return wramble.map((letter, index) => {
      const isDisabled =
        disabledLetters.includes(index) || letterCounts[letter] <= 0;
      if (!isDisabled) {
        letterCounts[letter] -= 1; // Decrement the count of the used letter
      }

      const blockStyles = isDisabled ? styles.disabledBlock : styles.block;
      const letterStyles = isDisabled ? styles.disabledLetter : styles.letter;

      return (
        <TouchableOpacity
          key={index}
          style={{
            marginRight: 6
          }}
          onPress={() => {
            setSelectedLetter(letter);
            setSelectedBlock(index);
            if (!isDisabled) {
              setDisabledLetters([...disabledLetters, index]);
            }
          }}
          disabled={isDisabled}
        >
          <View style={blockStyles}>
            <Text style={letterStyles}>{letter}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const wordBlocks = () => {
    if (wordState.length > 0) {
      // Only render the wordBlocks when wordState is not empty
      return wordState.map((letter, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginRight: 6
          }}
          onPress={() => {
            if (props.selectedLetter) {
              const newWordState = [...wordState];
              const newWrambleState = [...wrambleState];
              newWordState[index] = props.selectedLetter;
              newWrambleState[props.selectedBlock] = '';
              setWordState(newWordState);
              setWrambleState(newWrambleState);
              setSelectedLetter(null);
              setSelectedBlock(null);
            }
          }}
        >
          <View style={styles.block}>
            <Text
              style={{
                ...styles.letter,
                color: letter ? 'white' : 'transparent'
              }}
            >
              {letter || ' '}
            </Text>
          </View>
        </TouchableOpacity>
      ));
    }
  };

  const handleReset = () => {
    setDisabledLetters([]); // Reset disabled letters
    setWordState(Array(word.length).fill(null)); // Reset wordState with initial null values
    setWrambleState([]); // Reset wrambleState
    setSelectedLetter(null); // Reset selected letter
    setSelectedBlock(null); // Reset selected block
  };

  // Style for Buttons
  const labelStyle = {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Gaegu',
    letterSpacing: 4,
    padding: 2
  };

  if (props.word) {
    return (
      <>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: '17%'
          }}
        >
          <View>
            <View style={styles.blocksCont}>{wrambleBlocks()}</View>
            <View style={styles.blocksCont}>{wordBlocks()}</View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              buttonColor={Colors.color07}
              labelStyle={labelStyle}
              onPress={handleReset}
              style={styles.button}
            >
              Reset
            </Button>
            <Button
              buttonColor={Colors.color07}
              labelStyle={labelStyle}
              onPress={props.handleSubmit}
              style={[styles.button, { marginLeft: 80 }]}
            >
              Submit
            </Button>
          </View>
          <View
            style={{
              marginVertical: 20,
              alignItems: 'flex-end',
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Button
                icon={() => (
                  <Octicons name='report' size={30} color='#FF5C5C' />
                )}
                onPress={props.report}
                style={styles.report}
              />
              <Text style={styles.score}>score: {props.score}</Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  return null; // Return null if props.word is falsy or empty
};

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    borderWidth: 0.8,
    backgroundColor: '#1ACA9E',
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    width: 40,
    shadowColor: '#FFF',
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 }
  },
  letter: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'OpenSans-Bold',
    color: '#FFF',
    textShadowColor: '#292929',
    textShadowOffset: { width: 2, height: 0.8 },
    textShadowRadius: 3,
    lineHeight: 40
  },
  blocksCont: {
    flexDirection: 'row',
    marginVertical: 40
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    marginBottom: 10
  },
  score: {
    color: '#FFF',
    fontSize: 26,
    fontFamily: 'Gaegu',
    textShadowColor: '#292929',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    letterSpacing: 2,
    textAlign: 'center',
    marginRight: 30
  },
  currentBtnBg: {
    backgroundColor: '#1ACA9E',
    borderRadius: 50,
    width: 36,
    height: 36
  },
  currentBtn: {
    paddingRight: 12,
    paddingBottom: 4
  },
  report: {
    paddingRight: 50
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginLeft: 24
  },
  disabledBlock: {
    alignItems: 'center',
    borderWidth: 0.8,
    backgroundColor: 'grey',
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    width: 40,
    shadowColor: '#FFF',
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 }
  },
  disabledLetter: {
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'OpenSans-Bold',
    color: 'lightgray',
    textShadowColor: '#292929',
    textShadowOffset: { width: 2, height: 0.8 },
    textShadowRadius: 3,
    lineHeight: 40
  }
});

export default RenderWramble;
