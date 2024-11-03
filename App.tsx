import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GradebookContext} from './utils/GradebookContext';
import HomeScreen from './screens/HomeScreen';
import FirebaseFetcher from './FirebaseFetcher';
import GradebookScreen from './screens/GradeBookScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [thresholds, setThresholds] = useState({
    APlus: 97.5,
    A: 90,
    B: 80,
    C: 70,
  });

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GradebookContext.Provider value={{thresholds, setThresholds}}>
        <View style={{flex: 1}}>
          {/* <FirebaseFetcher /> */}
          <HomeScreen />
          <GradebookScreen />
        </View>
      </GradebookContext.Provider>
    </SafeAreaView>
  );
}

export default App;
