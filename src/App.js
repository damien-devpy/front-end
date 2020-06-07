import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Coaches from './pages/Coaches';
import Home from './pages/Home';
import Participants from './pages/Participants';
import Results from './pages/Results';
import Simulation from './pages/Simulation';
import Workshops from './pages/Workshops';
import { COLORS } from './vars';

const App = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bgColor', `${COLORS.BROWN.LIGHT}`);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/workshops" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/simulation" component={Simulation} />
        <Route path="/results" component={Results} />
        <Route path="/coaches" component={Coaches} />
        <Route path="/workshops" component={Workshops} />
        <Route
          path="/workshop/:workshopId/participants"
          component={Participants}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
