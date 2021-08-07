import "@fontsource/roboto/500.css";
import { CssBaseline } from "@material-ui/core";
import { AuthProvider } from "auth/AuthProvider";
import Login from "auth/Login";
import PrivateRoute from "auth/PrivateRoute";
import AppBar from "components/AppBar";
import {
  MessageSnackbar,
  MessageSnackbarContextProvider,
} from "components/SnackBar";
import Edit from "pages/Edit";
import Todos from "pages/List";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const appTitle = "React Firebase Sample";

const App = () => {
  return (
    <MessageSnackbarContextProvider>
      <AuthProvider>
        <CssBaseline />
        <div id="app">
          <AppBar appTitle={appTitle} />
          <Router>
            <div id="contents">
              <PrivateRoute exact path="/" component={Todos} />
              <PrivateRoute exact path="/edit" component={Edit} />
              <Route exact path="/login" component={Login} />
            </div>
          </Router>
        </div>
      </AuthProvider>
      <MessageSnackbar />
    </MessageSnackbarContextProvider>
  );
};

export default App;
