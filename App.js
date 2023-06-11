import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useCustomFonts } from './constants/myFonts';
import Main from './screens/MainCompontent';

export default function App() {
  const loadFonts = useCustomFonts();
  if (!loadFonts) {
    return null;
  }

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
