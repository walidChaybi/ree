/* istanbul ignore file */

import { receRouter } from "@router/ReceRouter";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
  
ReactDOM.render(
  <RouterProvider router={receRouter} />,
  document.getElementById("root")
);
