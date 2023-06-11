import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Caveat: require('../assets/fonts/Caveat-Bold.ttf'),
    Crayon: require('../assets/fonts/DkCrayonCrumble.ttf'),
    Chalk: require('../assets/fonts/Chalkiez.ttf'),
    Gaegu: require('../assets/fonts/Gaegu-Bold.ttf'),
    Qwitcher: require('../assets/fonts/QwitcherGrypen-Bold.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    FuzzyBubbles: require('../assets/fonts/FuzzyBubbles-Bold.ttf')
  });

  return fontsLoaded;
};
