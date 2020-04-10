import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Header from './components/Header';
import Footer from './components/Footer';
import Results from './pages/Results';

const App = () => (
  <BrowserRouter>
    <Header
      name='My Lockdown workshop'
      date='1 avril 2020'
      avatarName='Xavier Arques'
      avatarUrl='https://img.icons8.com/doodle/48/000000/user.png'
    ></Header>
    <div className='container'>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/simulation' component={Simulation} />
      <Route path='/results' component={Results} />
    </div>
    <Footer></Footer>
  </BrowserRouter>
);

export default App;
