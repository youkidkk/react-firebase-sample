import { app } from "firebase-app";
import React from "react";

function Home(props) {
  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
}

export default Home;
