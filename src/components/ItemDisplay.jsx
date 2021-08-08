import { Box, Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: "1rem",
  },
  itemDisplay: {
    fontSize: "1.1rem",
    marginLeft: 10,
  },
}));

const ItemDisplay = (props) => {
  const classes = useStyles();

  return (
    <Box mt={3}>
      <Typography variant="h6">{props.itemName}</Typography>
      <Divider />
      <div className={classes.itemDisplay}>{props.itemValue}</div>
    </Box>
  );
};

export default ItemDisplay;
