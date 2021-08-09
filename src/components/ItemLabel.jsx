import { Divider, Typography } from "@material-ui/core";

const ItemLabel = (props) => {
  return (
    <>
      <Typography variant="h6">{props.children}</Typography>
      <Divider />
    </>
  );
};

export default ItemLabel;
