import React from 'react';
import { Switch, Route } from 'react-router';
import { AnimatedSwitch } from 'react-router-transition';

import HomePage from './containers/HomePage';
import SettingsPage from './containers/SettingsPage';

export default (

  <AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className="switch-wrapper"
  >
      <Route exact path="/" component={HomePage} />
      <Route exact path="/settings" component={SettingsPage} />
  </AnimatedSwitch>
);
