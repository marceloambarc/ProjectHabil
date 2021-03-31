import * as React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App(){

  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Confira as novidade no CompreMaisAki!',
    },
    trigger: {
      seconds: 60 * 240,
      repeats: false
    },
  });

  return(
    <>
      <StatusBar barStyle='light-content' />
      <Routes />
    </>
  );
};
