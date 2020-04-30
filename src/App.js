import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";
import NewNavbar from "./components/NewNavbar";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import Results from "./pages/Results";
import Coaches from "./pages/Coaches/";
import Workshops from "./pages/Workshops";

const App = () => (
  <BrowserRouter>
    <NewNavbar
      avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
      firstName="Xavier"
      role="Animateur"
    />
    {/* <Header
      name="My Lockdown workshop"
      date="1 avril 2020"
      avatarName="Xavier Arques"
      avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
      firstName="Xavier"
      role="Animateur"
    ></Header> */}
    {/* <div className="container"> */}
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/simulation" component={Simulation} />
    <Route path="/results" component={Results} />
    <Route path="/coaches" component={Coaches} />
    <Route path="/workshops" component={Workshops} />
    {/* </div> */}
    {/* <Footer></Footer> */}
  </BrowserRouter>
);

export default App;
