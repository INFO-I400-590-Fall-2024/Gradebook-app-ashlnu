import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {GradebookContext} from '../utils/GradebookContext';

const GradebookScreen = () => {
  const gradebookContext = useContext(GradebookContext);
  const [studentGrade, setStudentGrade] = useState(85);
  const [newGrade, setNewGrade] = useState('');

  const requestNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      channelId: 'gradebook-channel',
      title: title,
      message: message,
    });
  };

  const updateStudentGrade = () => {
    const parsedNewGrade = Number(newGrade);
    checkThresholdCrossing(
      studentGrade,
      parsedNewGrade,
      gradebookContext?.thresholds.APlus || 0,
    );
    setStudentGrade(parsedNewGrade);

    // Trigger notification for grade update
    requestNotification(
      'Grade Updated',
      `Grade has been updated to ${parsedNewGrade}%`,
    );
  };

  const checkThresholdCrossing = (
    oldGrade: number,
    updatedGrade: number,
    threshold: number,
  ) => {
    if (oldGrade < threshold && updatedGrade >= threshold) {
      requestNotification(
        'Threshold Alert',
        `Grade crossed the ${threshold}% threshold!`,
      );
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20}}>Student Grade</Text>
      <Text style={{fontSize: 16, marginVertical: 10}}>
        Current Grade: {studentGrade}%
      </Text>
      <TextInput
        style={{borderBottomWidth: 1, marginVertical: 10, fontSize: 16}}
        placeholder="Enter new grade"
        value={newGrade}
        onChangeText={setNewGrade}
        keyboardType="numeric"
      />
      <Button title="Update Grade" onPress={updateStudentGrade} />
    </View>
  );
};

export default GradebookScreen;
