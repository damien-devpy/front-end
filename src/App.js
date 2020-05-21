import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";
import Results from "./pages/Results";
import Coaches from "./pages/Coaches/";
import Workshops from "./pages/Workshops";
import Participants from "./pages/Participants";
import { useWorkshop } from "./hooks/workshop";
import { COLORS } from "./vars";

const App = () => {
  useWorkshop(1);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bgColor", `${COLORS.BROWN.LIGHT}`);
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/simulation" component={Simulation} />
      <Route path="/results" component={Results} />
      <Route path="/coaches" component={Coaches} />
      <Route path="/workshops" component={Workshops} />
      <Route path="/participants" component={Participants} />
    </BrowserRouter>
  );
};

export default App;
