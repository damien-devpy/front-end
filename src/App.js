import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Coaches from './pages/Coaches';
import Data from './pages/Data';
import Home from './pages/Home';
import NavbarHome from './components/NavbarHome';
import NavbarWorkshop from './components/NavbarWorkshop';
import Participants from './pages/Participants';
import Resources from './pages/Resources';
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
        <Route path="/workshop/:workshopId/*" component={NavbarWorkshop} />
        <Route component={NavbarHome} />
      </Switch>
      <Switch>
        <Route
          path="/workshop/:workshopId/participants"
          component={Participants}
        />
        <Route path="/workshop/:workshopId/data" component={Data} />
        <Route path="/workshop/:workshopId/simulation" component={Simulation} />
        <Route path="/workshop/:workshopId/results" component={Results} />
        <Route exact path="/">
          <Redirect to="/workshops" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/coaches" component={Coaches} />
        <Route path="/workshops" component={Workshops} />
        <Route path="/resources" component={Resources} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
