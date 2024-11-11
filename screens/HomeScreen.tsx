import React, {useContext, useState} from 'react';
import {View, TextInput, Text, StyleSheet, Button} from 'react-native';
import {GradebookContext} from '../utils/GradebookContext';
import PushNotification from 'react-native-push-notification';

const HomeScreen = () => {
  const gradebookContext = useContext(GradebookContext);

  if (!gradebookContext) {
    return (
      <View>
        <Text>No context</Text>
      </View>
    );
  }

  const [newThreshold, setNewThreshold] = useState(
    gradebookContext.thresholds.APlus,
  );
  const {thresholds, setThresholds} = gradebookContext;

  const requestNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      channelId: 'gradebook-channel',
      title: title,
      message: message,
    });
  };

  const updateAPlusThreshold = () => {
    setThresholds(prev => ({
      ...prev,
      APlus: Number(newThreshold),
    }));

    // Trigger notification on threshold update
    requestNotification(
      'A+ Threshold Updated',
      `New A+ threshold set to ${newThreshold}%`,
    );
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20}}>Set A+ Threshold</Text>
      <TextInput
        style={{borderBottomWidth: 1, marginVertical: 10, fontSize: 16}}
        value={newThreshold.toString()}
        onChangeText={e => setNewThreshold(parseFloat(e))}
        keyboardType="numeric"
      />
      <Button title="Update Threshold" onPress={updateAPlusThreshold} />
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
