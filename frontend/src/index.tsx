import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Welcome from "./pages/welcome";
import Chat from "./pages/chat";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./fonts/HelloStockholm-Regular.ttf";
import "./fonts/NatureSpiritRegular.otf";

declare global {
  interface Window {
    analytics: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Welcome />
        </Route>
        <Route exact={true} path="/chat/:id" component={Chat} />
      </Switch>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
