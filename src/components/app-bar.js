import {
  AppBar as MuiAppBar,
  Chip,
  ClickAwayListener,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
import { useContext, useState } from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    maxHeight: "64px",
    marginBottom: "1.0rem",
  },
  grow: {
    flexGrow: 1,
  },
  accountChip: {
    color: indigo[50],
    backgroundColor: indigo[400],
  },
  accountChipIcon: {
    color: indigo[50],
  },
}));

export default function AppBar(props) {
  const classes = useStyles();

  const { currentUser, logout } = useContext(AuthContext);
  const [accountTooltipOpen, toggleAccountTooltipOpen] = useState(false);

  const handleAccountTooltipOpen = () => {
    toggleAccountTooltipOpen(true);
  };
  const handleAccountTooltipClose = () => {
    toggleAccountTooltipOpen(false);
  };

  return (
    <MuiAppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">{props.appTitle}</Typography>
        <div className={classes.grow} />
        {currentUser && (
          <>
            <Hidden lgUp>
              <ClickAwayListener onClickAway={handleAccountTooltipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleAccountTooltipClose}
                  open={accountTooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={currentUser.email}
                >
                  <AccountCircle
                    className={classes.accountChipIcon}
                    onClick={handleAccountTooltipOpen}
                  />
                </Tooltip>
              </ClickAwayListener>
            </Hidden>
            <Hidden mdDown>
              <Chip
                icon={<AccountCircle className={classes.accountChipIcon} />}
                label={currentUser.email}
                className={classes.accountChip}
              />
            </Hidden>
            <IconButton edge="end" color="inherit" onClick={() => logout()}>
              <ExitToApp />
            </IconButton>
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
