import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/signup";
import Admin from "./components/admin";
import Teacher from './components/teacher'
import CardPDF from './components/cardPDF'

export default function MyRoute() {
  return (
    <Router>
      <Route>
        <Route exact path="/cardtoprint" component={CardPDF} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/" component={Signup} />
      </Route>
    </Router>
  );
}
