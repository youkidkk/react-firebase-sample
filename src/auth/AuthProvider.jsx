import { MessageSnackbarContext } from "components/snack-bar";
import { app } from "firebase-app.js";
import React, { useContext, useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { showMessageSnackbar } = useContext(MessageSnackbarContext);

  const login = async (email, password, history) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      showMessageSnackbar(true, "success", "ログインしました。");
      history.push("/");
    } catch (error) {
      showMessageSnackbar(true, "error", "ログインできませんでした。");
    }
  };

  const logout = () => {
    app.auth().signOut();
    showMessageSnackbar(true, "success", "ログアウトしました。");
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
