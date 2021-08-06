import {
  AppBar as MuiAppBar,
  Chip,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
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

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <MuiAppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">{props.appTitle}</Typography>
        <div className={classes.grow} />
        {currentUser && (
          <>
            <Chip icon={<AccountCircle />} label={currentUser.email} />
            <IconButton edge="end" color="inherit" onClick={() => logout()}>
              <ExitToApp />
            </IconButton>
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
