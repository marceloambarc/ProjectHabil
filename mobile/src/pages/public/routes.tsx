import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import SupplierView from './SupplierViewScreen';
import PromotionDetailsScreen from './PromotionDetailsScreen.tsx';

const Stack = createStackNavigator();

export default function MainRoute(){
  return(

    <Stack.Navigator initialRouteName="Splash">

      <Stack.Screen 
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,          
        }}
      />

      <Stack.Screen 
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="SupplierView"
        component={SupplierView}
        options={{
          headerShown: true
        }}
      />

      <Stack.Screen 
        name="PromotionDetails"
        component={PromotionDetailsScreen}
        options={{
          headerShown: true
        }}
      />

    </Stack.Navigator>

  );
}