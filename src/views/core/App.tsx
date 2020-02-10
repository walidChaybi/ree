import React from "react";
import "../../sass/_library.scss";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./header/Header";
import { Body } from "./body/Body";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Router>
  );
};

export default App;
