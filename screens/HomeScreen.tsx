// screens/HomeScreen.tsx
import React, {useContext} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {GradebookContext} from '../utils/GradebookContext';

const HomeScreen = () => {
  const gradebookContext = useContext(GradebookContext);

  if (!gradebookContext) {
    return null;
  }

  const {thresholds, setThresholds} = gradebookContext;

  const updateAPlusThreshold = (text: string) => {
    setThresholds(prevThresholds => ({
      ...prevThresholds,
      B: Number(text),
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set A+ Threshold:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter A+ Threshold"
        value={String(thresholds.B)}
        onChangeText={updateAPlusThreshold}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
});

export default HomeScreen;
