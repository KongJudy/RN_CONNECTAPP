import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useCustomFonts } from './constants/myFonts';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './screens/MainCompontent';

export default function App() {
  const loadFonts = useCustomFonts();
  if (!loadFonts) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer style={styles.container}>
            <Main />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </>
  );
}
