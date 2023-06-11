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
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.prompt}>{prompt}</Text>

          <Button textColor={Colors.color07} onPress={openModal}>
            Press here to write something...
          </Button>
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
    </View>
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
  }
});

export default RenderPrompt;
