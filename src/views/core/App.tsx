import React from "react";
import "../../sass/_library.scss";
import "../../sass/_colors.scss";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./header/Header";
import { Body } from "./body/Body";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
        <ToastContainer
          className={"toast-container"}
          position="top-center"
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
        />
      </div>
    </Router>
  );
};

export default App;
