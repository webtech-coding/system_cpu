import React from "react";
import ReactDOM from "react-dom";
import MasterLayout from "./hoc/MasterLayout";

import App from "./App";
ReactDOM.render(
  <MasterLayout>
    <App />
  </MasterLayout>,
  document.getElementById("root")
);
