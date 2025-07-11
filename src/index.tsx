/* v8 ignore start */
import App from "@core/App";
import { createRoot } from "react-dom/client";
import "./index.css";
import PolicesEtStylesRECE from "./utils/PolicesEtStylesRECE";

PolicesEtStylesRECE.chargerPolices();

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
/* v8 ignore end */
