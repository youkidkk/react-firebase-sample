import {
  Chip,
  ClickAwayListener,
  Hidden,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { AccountCircle } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
import { useContext, useState } from "react";

const useStyles = makeStyles((theme) => ({
  accountChip: {
    color: indigo[50],
    backgroundColor: indigo[400],
  },
  accountChipIcon: {
    color: indigo[50],
  },
}));

export default function AccountChip(props) {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  const [tooltipOpen, toggleTooltipOpen] = useState(false);

  const handleTooltipOpen = () => {
    toggleTooltipOpen(true);
  };
  const handleTooltipClose = () => {
    toggleTooltipOpen(false);
  };

  return (
    <>
      <Hidden lgUp>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={currentUser.email}
          >
            <AccountCircle
              className={classes.accountChipIcon}
              onClick={handleTooltipOpen}
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
    </>
  );
}
