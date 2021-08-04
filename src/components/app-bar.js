import {
  AppBar as MuiAppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
import { app } from "firebase-app";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    maxHeight: "64px",
    marginBottom: "1.0rem",
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function AppBar(props) {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  return (
    <MuiAppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">{props.appTitle}</Typography>
        <div className={classes.grow} />
        {currentUser && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => app.auth().signOut()}
          >
            <ExitToApp />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
