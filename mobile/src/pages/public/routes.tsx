import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import SupplierScreen from './SupplierScreen';
import PromotionsScreen from './PromotionScreen';
import PromotionDetailsScreen from './PromotionDetailsScreen';
import SupplierAboutScreen from './SupplierAboutScreen';

const Stack = createStackNavigator();

export default function MainRoute(){
  return(

    <Stack.Navigator initialRouteName="Splash">

      <Stack.Screen 
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false          
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
        name="Supplier"
        component={SupplierScreen}
        options={{
          headerShown: true
        }}
      />

      <Stack.Screen 
        name="Promotions"
        component={PromotionsScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="SupplierAbout"
        component={SupplierAboutScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="PromotionDetails"
        component={PromotionDetailsScreen}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>

  );
}