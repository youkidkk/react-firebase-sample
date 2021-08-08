import { Card, Container, makeStyles } from "@material-ui/core";
import { AuthContext } from "auth/AuthProvider";
import { DATE_FORMAT_DISPLAY } from "common/common-const";
import ContentsTitle from "components/ContentsTitle";
import ItemDisplay from "components/ItemDisplay";
import dateFormat from "dateformat";
import { getTodo } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";

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

const getTodoAsync = async (uid, id, setTodo) => {
  try {
    setTodo(await getTodo(uid, id));
  } catch (error) {
    console.log(error);
  }
};

const View = (props) => {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const id = props.match.params.id;
  const [todo, setTodo] = useState(null);
  useEffect(() => getTodoAsync(uid, id, setTodo), [uid, id]);
  if (todo == null) {
    return null;
  }
  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <ContentsTitle title="Todo内容" />
        <ItemDisplay itemName="概要" itemValue={todo.overview} />
        <ItemDisplay
          itemName="期限"
          itemValue={dateFormat(new Date(todo.deadline), DATE_FORMAT_DISPLAY)}
        />
        <ItemDisplay itemName="優先度" itemValue={todo.priority} />
        <ItemDisplay itemName="詳細" itemValue={todo.details} />
      </Card>
    </Container>
  );
};

export default withRouter(View);
