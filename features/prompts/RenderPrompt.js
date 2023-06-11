import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RenderPrompt = ({ prompt, onSubmit }) => {
  const [text, setText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        extraScrollHeight={100}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.prompt}>{prompt}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder='Type your answer here'
              placeholderTextColor={'black'}
              multiline
            />
            <Button onPress={() => onSubmit(text)}>Submit</Button>
          </Card.Content>
        </Card>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    width: '100%'
  },
  prompt: {
    textAlign: 'center',
    fontFamily: 'FuzzyBubbles',
    fontSize: 20,
    color: 'black',
    marginBottom: 20
  },
  input: {
    fontFamily: 'FuzzyBubbles',
    textAlign: 'center',
    height: 100,
    borderColor: 'gray',
    borderWidth: 0.3,
    marginBottom: 10
  }
});

export default RenderPrompt;
