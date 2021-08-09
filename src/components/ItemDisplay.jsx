import { Box, makeStyles } from "@material-ui/core";
import ItemLabel from "./ItemLabel";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: "1rem",
  },
  itemDisplay: {
    fontSize: "1.1rem",
    marginLeft: 10,
    whiteSpace: "pre-wrap",
  },
}));

const ItemDisplay = (props) => {
  const classes = useStyles();

  return (
    <Box mt={3}>
      <ItemLabel>{props.itemName}</ItemLabel>
      <div className={classes.itemDisplay}>{props.itemValue}</div>
    </Box>
  );
};

export default ItemDisplay;
