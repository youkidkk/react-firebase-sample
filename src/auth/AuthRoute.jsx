import { AuthContext } from "auth/AuthProvider";
import React, { useContext } from "react";
import { Redirect } from "react-router";

const AuthRoute = (props) => {
  const { currentUser } = useContext(AuthContext);
  return <>{currentUser ? props.children : <Redirect to="/login" />}</>;
};

export default AuthRoute;
