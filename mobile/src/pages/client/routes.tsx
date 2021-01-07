import { createStackNavigator } from '@react-navigation/stack';

{/* COMPANY PATH */}
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

import HomeScreen from './HomeScreen';
import CompanyProductsScreen from './CompanyProductsScreen';
import CompanyProductOverviewScreen from './CompanyProductOverviewScreen';
import NewPromotionScreen from './NewPromotionScreen';
import NewPromotionOverviewScreen from './NewPromotionOverviewScreen';

const Stack  = createStackNavigator();

export default function Root(){
  return(
    <Stack.Navigator screenOptions={{ headerShown : false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CompanyProducts" component={CompanyProductsScreen} />
      <Stack.Screen name="CompanyProductsOverview" component={CompanyProductOverviewScreen} />
      <Stack.Screen name="NewPromotion" component={NewPromotionScreen} />
      <Stack.Screen name="NewPromotionOverview" component={NewPromotionOverviewScreen} />
    </Stack.Navigator>
  );
}