/* @refresh reload */
import { render } from "solid-js/web";

import { App } from "./components/App/App";
import { AppDev } from "./components/AppDev/AppDev";
import "./index.css";
import "./theme.css";

render(
  () => (import.meta.env.DEV ? <AppDev /> : <App />),
  document.getElementById("root")
);
