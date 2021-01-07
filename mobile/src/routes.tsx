import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './pages/public/routes';
import CompanyPath from './pages/client/routes';

const Stack  = createStackNavigator();

export default function Routes(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">

        <Stack.Screen name="Main" component={MainScreen} />

        <Stack.Screen name="CompanyPath" component={CompanyPath} />
  
      </Stack.Navigator>
    </NavigationContainer>
  )
}