import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductDetailsScreen from './ProductDetailsScreen';
import ProductListScreen from './ProductListScreen';

import Header from '../../components/Header';

const Stack = createStackNavigator();


export default function MainScreen() {
  return (

    <Stack.Navigator initialRouteName="tabNavigation">

      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen}
        options={{
          headerShown: true,
          header: () => <Header />
        }}
      />

      <Stack.Screen name="ProductView" component={ProductDetailsScreen} />

    </Stack.Navigator>  
      
  );
}