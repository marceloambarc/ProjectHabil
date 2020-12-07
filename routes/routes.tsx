import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/Login.tsx';
import Register from '../screens/Register.tsx';
import Term from '../screens/Term.tsx';

import AccessCompany from '../screens/AccessCompany.tsx';
import RegisterPromotion from '../screens/RegisterPromotion.tsx';

import Preview from '../screens/Preview.tsx';
import ViewPromotions from '../screens/ViewPromotions';

import ProductDetails from '../screens/ProductDetails';


const screens = {
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Term: {
    screen: Term
  },
  AccessCompany: {
    screen: AccessCompany
  },
  ProductDetails: {
    screen: ProductDetails
  },
  RegisterPromotion: {
    screen: RegisterPromotion
  },
  Preview: {
    screen: Preview
  },
  ViewPromotions: {
    screen: ViewPromotions
  }
}

const Routes = createStackNavigator(screens);

export default createAppContainer(Routes);