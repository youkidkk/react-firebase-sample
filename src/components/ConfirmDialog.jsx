import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    paddingBottom: 1,
  },
}));

const ConfirmDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog open={props.open} onClose={props.onConfirmCancel}>
      <DialogTitle className={classes.dialogTitle}>
        {props.title ? props.title : "確認"}
      </DialogTitle>
      <Divider />
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.onConfirmCancel}>
          Cancel
        </Button>
        <Button onClick={props.onConfirmOk}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
