import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import ChangePassword from './pages/ChangePassword';
import Coaches from './pages/Coaches';
import Data from './pages/Data';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import NavbarHome from './components/NavbarHome';
import NavbarWorkshop from './components/NavbarWorkshop';
import Participants from './pages/Participants';
import Resources from './pages/Resources';
import Results from './pages/Results';
import Simulation from './pages/Simulation';
import Workshops from './pages/Workshops';
import { COLORS } from './vars';
import { changeCurrentUserPassword } from './actions/user';
import { getAccessToken } from './utils/auth';
import { useAuthentication } from './hooks/authentication';

const AppRouter = ({ currentUser }) => {
  const dispatch = useDispatch();
  const handleChangePassword = (password, accessToken, callback) =>
    dispatch(changeCurrentUserPassword(password, accessToken, callback));

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/workshop/:workshopId/*" component={NavbarWorkshop} />
        <Route>
          <NavbarHome currentUser={currentUser} />
        </Route>
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
        <Route path="/changePassword">
          <ChangePassword
            handleChangePassword={handleChangePassword}
            // handleClose={handleClose}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const LoginRouter = ({ handleLogin }) => (
  <BrowserRouter>
    <Navbar />
    <Login handleLogin={handleLogin} />
  </BrowserRouter>
);

const App = () => {
  const [token, setToken] = useState(getAccessToken());
  const { user, signedIn, isLoading } = useAuthentication(token);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bgColor', `${COLORS.BROWN.LIGHT}`);
  }, []);

  const handleLogin = ({ access_token: accessToken }) => {
    setToken(accessToken);
  };

  if (isLoading) {
    return <Spinner animation="border" className="pt-3 mx-auto mt-5" />;
  }
  if (signedIn) {
    return <AppRouter currentUser={user} />;
  }

  return <LoginRouter handleLogin={handleLogin} />;
};

export default App;
