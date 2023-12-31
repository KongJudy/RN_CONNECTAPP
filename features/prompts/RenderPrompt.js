import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  View
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';

const RenderPrompt = ({ prompt, onSubmit }) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Animatable.View
      animation='fadeInUp'
      duration={2000}
      delay={1000}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.prompt}>{prompt}</Text>

          <Button
            style={{ alignItems: 'flex-start' }}
            textColor={Colors.color07}
            onPress={openModal}
          >
            You wrote...
          </Button>

          {text !== '' && <Text style={styles.cardText}>{text}</Text>}
        </Card.Content>
      </Card>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Card style={styles.innerModal}>
                    <Card.Content>
                      <Text style={styles.prompt}>{prompt}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={setText}
                        value={text}
                        placeholder='Type your answer here'
                        placeholderTextColor={Colors.color07}
                        multiline
                        maxLength={160}
                      />
                    </Card.Content>
                    <View style={styles.buttonContainer}>
                      <Button
                        textColor={Colors.color07}
                        styles={styles.closeButton}
                        onPress={closeModal}
                      >
                        Close
                      </Button>
                      <Button
                        textColor={Colors.color01}
                        style={styles.button}
                        onPress={() => {
                          onSubmit(text);
                          closeModal();
                        }}
                      >
                        Submit
                      </Button>
                    </View>
                  </Card>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  prompt: {
    textAlign: 'center',
    fontFamily: 'FuzzyBubbles',
    fontSize: 20,
    color: Colors.color01,
    marginBottom: 20
  },
  card: {
    width: '96%'
  },
  input: {
    fontFamily: 'FuzzyBubbles',
    textAlign: 'center',
    height: 140,
    borderColor: 'gray',
    borderWidth: 0.3,
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerModal: {
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12
  },
  cardText: {
    fontFamily: 'FuzzyBubbles'
  }
});

export default RenderPrompt;
