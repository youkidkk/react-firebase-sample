import "@fontsource/roboto/500.css";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "auth/AuthProvider";
import AuthRoute from "auth/AuthRoute";
import Login from "auth/Login";
import AppBar from "components/AppBar";
import {
  MessageSnackbar,
  MessageSnackbarContextProvider,
} from "components/SnackBar";
import Edit from "pages/todos/Edit";
import List from "pages/todos/List";
import View from "pages/todos/View";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const appTitle = "React Firebase Sample";

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MessageSnackbarContextProvider>
        <AuthProvider>
          <CssBaseline />
          <div id="app">
            <AppBar appTitle={appTitle} />
            <Router>
              <div id="contents">
                <Switch>
                  <Route path="/login" component={Login} />
                  <AuthRoute>
                    <Route path="/todos/list" component={List} />
                    <Route path="/todos/view/:id" component={View} />
                    <Route path="/todos/update/:id" component={Edit} />
                    <Route path="/todos/create" component={Edit} />
                  </AuthRoute>
                </Switch>
              </div>
            </Router>
          </div>
        </AuthProvider>
        <MessageSnackbar />
      </MessageSnackbarContextProvider>
    </ThemeProvider>
  );
};

export default App;
