import { AuthContext } from "auth/AuthProvider";
import React, { useContext } from "react";

function Home(props) {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => logout()}>Sign out</button>
    </div>
  );
}

export default Home;
