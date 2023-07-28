import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

import data from '../test.json'

import { GHUser } from "./GHUser.tsx";

    //<GHUser {...data}/> 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />

  </React.StrictMode>,
);
