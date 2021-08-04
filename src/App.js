import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import "@fontsource/roboto/500.css";

import PrivateRoute from "auth/PrivateRoute";
import { AuthProvider } from "auth/AuthProvider";
import Home from "pages/Home";
import Login from "auth/Login";
import AppBar from "components/app-bar";

const appTitle = "React Firebase Sample";

const App = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <div id="app">
        <AppBar appTitle={appTitle} />
        <Router>
          <div id="contents">
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
