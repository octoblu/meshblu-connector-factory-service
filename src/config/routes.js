import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import Home from '../containers/home';
import NoMatch from '../components/no-match/';
import { storeAuthentication } from '../helpers/authentication'

export default (
  <Route>
    <Route path="/authenticated" onEnter={storeAuthentication}/>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
    <Route path="*" status={404} component={NoMatch} />
  </Route>
);
