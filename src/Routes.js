import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main/Main";
import MainProduct from "./Pages/Main/MainProduct/MainProduct";
import Detail from "./Pages/Detail/Detail";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Nav from "./Components/Nav/Nav";
import Cart from "./Pages/Cart/Cart";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/mainproduct" component={MainProduct} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/detail/:productId" component={Detail} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
