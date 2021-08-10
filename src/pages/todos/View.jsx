import {
  Box,
  Card,
  Container,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Done, Edit, List } from "@material-ui/icons";
import { AuthContext } from "auth/AuthProvider";
import { DATE_FORMAT_DISPLAY } from "common/common-const";
import ConfirmDialog from "components/ConfirmDialog";
import ContentsTitle from "components/ContentsTitle";
import ItemDisplay from "components/ItemDisplay";
import { MessageSnackbarContext } from "components/SnackBar";
import dateFormat from "dateformat";
import { doneTodo, getTodo } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  const { showMessageSnackbar } = useContext(MessageSnackbarContext);
  const [todo, setTodo] = useState(null);
  const [doneConfirmOpen, setDoneConfirmOpen] = useState(false);
  const history = useHistory();

  useEffect(() => getTodoAsync(uid, id, setTodo), [uid, id]);
  if (todo == null) {
    return null;
  }

  const handleDone = () => {
    setDoneConfirmOpen(true);
  };

  const handleDoneConfirmOk = async (history) => {
    try {
      await doneTodo(uid, id);
      showMessageSnackbar(true, "success", "完了に更新しました。");
      history.push("/todos/list");
    } catch (error) {
      showMessageSnackbar(true, "error", "更新に失敗しました。");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <ContentsTitle title="Todo内容" />
        <Box mt={3} display="flex">
          <IconButton onClick={() => history.push("/todos/list")}>
            <List />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={() => history.push(`/todos/update/${id}`)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDone(history)}>
            <Done />
          </IconButton>
        </Box>
        <ItemDisplay itemName="概要" itemValue={todo.overview} />
        <ItemDisplay
          itemName="期限"
          itemValue={dateFormat(new Date(todo.deadline), DATE_FORMAT_DISPLAY)}
        />
        <ItemDisplay itemName="優先度" itemValue={todo.priorityDisplay} />
        <ItemDisplay itemName="詳細" itemValue={todo.details} />
      </Card>
      <ConfirmDialog
        open={doneConfirmOpen}
        onConfirmOk={() => handleDoneConfirmOk(history)}
        onConfirmCancel={() => setDoneConfirmOpen(false)}
      >
        <div style={{ fontSize: "1.1rem", whiteSpace: "pre-wrap" }}>
          {"完了とします。\nよろしいですか？"}
        </div>
      </ConfirmDialog>
    </Container>
  );
};

export default View;
