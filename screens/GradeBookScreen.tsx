// screens/GradebookScreen.tsx
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GradebookContext} from '../utils/GradebookContext';

const GradebookScreen = () => {
  const gradebookContext = useContext(GradebookContext);

  if (!gradebookContext) {
    return null;
  }

  const {thresholds} = gradebookContext;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Grade Thresholds:</Text>
      <Text style={styles.threshold}>A+ Threshold: {thresholds.APlus}</Text>
      <Text style={styles.threshold}>A Threshold: {thresholds.A}</Text>
      <Text style={styles.threshold}>B Threshold: {thresholds.B}</Text>
      <Text style={styles.threshold}>C Threshold: {thresholds.C}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  threshold: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default GradebookScreen;
