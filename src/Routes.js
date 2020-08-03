import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Detail from "./Pages/Detail/Detail";
import SignUp from "./Pages/SignUp/SignUp";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/detail" component={Detail} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
