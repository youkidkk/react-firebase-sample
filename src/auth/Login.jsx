import {
  Box,
  Button,
  Card,
  Container,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { AuthContext } from "auth/AuthProvider";
import ContentsTitle from "components/ContentsTitle";
import ItemLabel from "components/ItemLabel";
import React, { useContext, useRef } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: "1rem",
  },
  form: {
    width: "100%",
  },
}));

const Login = () => {
  const { currentUser, login } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const formRef = useRef();

  if (currentUser) {
    history.push("/todos/list");
  }

  const handleClear = () => {
    formRef.current.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formRef.current.elements;
    login(email.value, password.value, history);
  };

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <ContentsTitle title="ログイン" />
        <form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
          <Box mt={2}>
            <ItemLabel>Eメール</ItemLabel>
            <TextField
              name="email"
              inputProps={{ required: true }}
              fullWidth
              margin="dense"
              autoComplete="false"
            />
          </Box>
          <Box mt={2}>
            <ItemLabel>パスワード</ItemLabel>
            <TextField
              name="password"
              type="password"
              inputProps={{ required: true }}
              fullWidth
              margin="dense"
              autoComplete="false"
            />
          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Box ml={1}>
              <Button variant="outlined" onClick={handleClear}>
                クリア
              </Button>
            </Box>
            <Box ml={1}>
              <Button type="submit">ログイン</Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
