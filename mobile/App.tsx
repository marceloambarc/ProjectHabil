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

  const trigger = new Date(Date.now() + 60 * 60 * 1000);
  trigger.setMinutes(0);
  trigger.setSeconds(0);
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Confira as novidade no CompreMaisAki!',
    },
    trigger: trigger,
  });

  return(
    <>
      <StatusBar barStyle='light-content' />
      <Routes />
    </>
  );
};
