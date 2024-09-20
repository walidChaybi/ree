/* istanbul ignore file */

import App from "@core/App";
import { createRoot } from "react-dom/client";
import "./index.css";
import PolicesRECE from "./utils/PolicesRECE";

PolicesRECE.charger();

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);