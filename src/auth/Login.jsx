import { Box, Button, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import ContentsTitle from "../components/contents-title";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <Box m={2} p={1}>
      <ContentsTitle title="ログイン" />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="email"
            label="Eメール"
            inputProps={{ required: true }}
          />
        </div>
        <div>
          <TextField
            name="password"
            label="パスワード"
            type="password"
            inputProps={{ required: true }}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            ログイン
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default withRouter(Login);
