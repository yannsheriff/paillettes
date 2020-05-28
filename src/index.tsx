import React from "react";
import ReactDOM from "react-dom";
import "./react-app/index.css";
import App from "./react-app/App";
import * as serviceWorker from "./react-app/serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
