import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import NewPromotionScreen from './NewPromotionScreen';
import NewPromotionOverviewScreen from './NewPromotionOverviewScreen';
import SupplierPromotionScreen from './SupplierPromotionScreen';
import SupplierPromotionOverviewScreen from './SupplierPromotionOverviewScreen';
import EditPromotionScreen from './EditPromotionScreen';
import EditPromotionOverviewScreen from './EditPromotionOverviewScreen';

const Stack = createStackNavigator();

export default function Root(){

  return (
    <Stack.Navigator screenOptions={{ headerShown:  false }}>

      <Stack.Screen name="Login" component={ LoginScreen } />
      <Stack.Screen name="Register" component={ RegisterScreen } />
      <Stack.Screen name="Home" component={ HomeScreen } />
      <Stack.Screen name="NewPromotion" component={ NewPromotionScreen } />
      <Stack.Screen name="NewPromotionOverview" component={ NewPromotionOverviewScreen } />
      <Stack.Screen name="SupplierPromotion" component={ SupplierPromotionScreen } />
      <Stack.Screen name="SupplierPromotionOverviewS" component={ SupplierPromotionOverviewScreen } />
      <Stack.Screen name="EditPromotion" component={ EditPromotionScreen } />
      <Stack.Screen name="EditPromotionOverview" component={ EditPromotionOverviewScreen } />

    </Stack.Navigator>
  );
  
} 