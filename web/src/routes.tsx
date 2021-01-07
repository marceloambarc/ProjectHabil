import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import ControlMap from './pages/ControlMap';

import Companies from './pages/private/Companies';
import Products from './pages/private/Products';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={ControlMap} />

        <Route path="/products" component={Products} />
        <Route path="/companies" component={Companies} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;