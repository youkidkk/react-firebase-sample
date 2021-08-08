import { MessageSnackbarContext } from "components/SnackBar";
import { FirebaseApp } from "firebase-app.js";
import React, { useContext, useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { showMessageSnackbar } = useContext(MessageSnackbarContext);

  const login = async (email, password, history) => {
    try {
      await FirebaseApp.auth().signInWithEmailAndPassword(email, password);
      showMessageSnackbar(true, "success", "ログインしました。");
      history.push("/todos/list");
    } catch (error) {
      showMessageSnackbar(true, "error", "ログインできませんでした。");
    }
  };

  const logout = () => {
    FirebaseApp.auth().signOut();
    showMessageSnackbar(true, "success", "ログアウトしました。");
  };

  useEffect(() => {
    FirebaseApp.auth().onAuthStateChanged(setCurrentUser);
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
