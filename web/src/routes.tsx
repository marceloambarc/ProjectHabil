import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Client from './pages/Client';
import Landing from './pages/Landing';

import Companie from './pages/Companie';
import Activate from './pages/Activate'

import ControlMap from './pages/private/ControlMap';
import Companies from './pages/private/Companies';
import Products from './pages/private/Products';
import Moderators from './pages/private/Moderators';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/client" component={Client} />
        <Route path="/companie/:id" component={Companie} />

        <Route path="/login" component={Landing} />
        
        {/*fazer token para rota*/}
        <Route path="/activate/:id" component={Activate} />
        <Route path="/app" component={ControlMap} />

        <Route path="/products" component={Products} />
        <Route path="/companies" component={Companies} />

        <Route path="/moderators" component={Moderators} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;