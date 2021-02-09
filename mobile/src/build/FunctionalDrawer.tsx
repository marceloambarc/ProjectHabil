import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function Feed({ navigation }:{ navigation:any }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

function Notifications({ navigation }:{ navigation:any }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function SplashScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Feed">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}