import { AuthContext } from "auth/AuthProvider";
import Login from "auth/Login";
import React, { useContext } from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : Login;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
