import {
  Button,
  Card,
  Container,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { AuthContext } from "auth/AuthProvider";
import ContentsTitle from "components/contents-title";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: "1rem",
  },
  form: {
    width: "100%",
  },
  actions: {
    marginTop: "2rem",
    textAlign: "right",
    "& > *": {
      marginLeft: "1rem",
    },
  },
}));

const initialFormState = {
  email: "",
  password: "",
};

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  const classes = useStyles();

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleClear = () => {
    setFormState(initialFormState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <ContentsTitle title="ログイン" />
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <TextField
              name="email"
              label="Eメール"
              inputProps={{ required: true }}
              fullWidth
              margin="dense"
              autoComplete="false"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              name="password"
              label="パスワード"
              type="password"
              inputProps={{ required: true }}
              fullWidth
              margin="dense"
              autoComplete="false"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div className={classes.actions}>
            <Button variant="outlined" color="primary" onClick={handleClear}>
              クリア
            </Button>
            <Button type="submit" variant="contained" color="primary">
              ログイン
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default withRouter(Login);
