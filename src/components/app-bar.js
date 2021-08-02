import {
  AppBar as MuiAppBar,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    maxHeight: "64px",
  },
}));

export default function AppBar(props) {
  const classes = useStyles();

  return (
    <MuiAppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">{props.appTitle}</Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
