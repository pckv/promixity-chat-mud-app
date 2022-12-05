/* @refresh reload */
import { render } from "solid-js/web";

import { App } from "./components/App/App";
import "./index.css";
import "./theme.css";

render(() => <App />, document.getElementById("root"));
