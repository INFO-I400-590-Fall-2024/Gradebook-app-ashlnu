import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import HomeScreen from './screens/HomeScreen';
import GradebookScreen from './screens/GradeBookScreen';
import {GradebookContext} from './utils/GradebookContext';

const App = () => {
  const [thresholds, setThresholds] = useState({
    APlus: 97.5,
    A: 90,
    B: 80,
    C: 70,
  });

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message:
              'This app needs access to notifications to send you reminders.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(permission);

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Notification Permission',
            'Notifications are disabled. To enable, go to Settings and turn on notifications for this app.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        } else {
          Alert.alert(
            'Notifications Disabled',
            'Please enable notifications to receive reminders.',
          );
        }
      }
    };

    // Configure Push Notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'gradebook-channel',
        channelName: 'Gradebook Notifications',
      },
      created => console.log(`Channel created: ${created}`),
    );

    // Request permissions and handle exact alarms for Android 12+
    requestNotificationPermission().then(() => {
      // if (Platform.OS === 'android' && Platform.Version >= 31) {
      //   Alert.alert(
      //     'Exact Alarm Permission',
      //     'To ensure timely reminders, please allow exact alarms for this app in settings.',
      //     [
      //       {text: 'Cancel', style: 'cancel'},
      //       {
      //         text: 'Open Settings',
      //         onPress: () => Linking.openSettings(),
      //       },
      //     ],
      //   );
      // }

      // Schedule the recurring notification
      scheduleBackgroundNotification();
    });
  }, []);

  const requestNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      channelId: 'gradebook-channel',
      title: title,
      message: message,
    });
  };

  const scheduleBackgroundNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'gradebook-channel',
      title: 'Grade Review Reminder',
      message: "Don't forget to review grades!",
      repeatType: 'time',
      repeatTime: 10 * 1000,
      allowWhileIdle: true,
      date: new Date(),
    });
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20}}>
        Gradebook App
      </Text>
      <GradebookContext.Provider value={{thresholds, setThresholds}}>
        <HomeScreen />
        <GradebookScreen />
      </GradebookContext.Provider>
    </View>
  );
};

export default App;
