import React, { FunctionComponent } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './containers/Layout';
import ProductsComponent from './components/Products';
import CartComponent from './components/Cart';

import 'bootstrap/dist/css/bootstrap.css';

const App: FunctionComponent = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={ProductsComponent} />
        <Route path="/cart" exact component={CartComponent} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
