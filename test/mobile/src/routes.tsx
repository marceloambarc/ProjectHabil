import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPath from './pages/public/routes';
import CompanyPath from './pages/client/routes';

const Stack  = createStackNavigator();

export default function Routes(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">

        <Stack.Screen name="Main" options={{headerShown: false}} component={MainPath} />

        <Stack.Screen name="Company" options={{headerShown: false}} component={CompanyPath} />
  
      </Stack.Navigator>
    </NavigationContainer>
  )
}