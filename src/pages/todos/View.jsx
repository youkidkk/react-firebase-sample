import { Typography } from "@material-ui/core";
import { AuthContext } from "auth/AuthProvider";
import ContentsTitle from "components/ContentsTitle";
import { getTodo } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";

const getTodoAsync = async (uid, id, setTodo) => {
  try {
    setTodo(await getTodo(uid, id));
  } catch (error) {
    console.log(error);
  }
};

const View = (props) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const id = props.match.params.id;
  const [todo, setTodo] = useState(null);
  useEffect(() => getTodoAsync(uid, id, setTodo), [uid, id]);
  if (todo == null) {
    return null;
  }
  return (
    <>
      <ContentsTitle title="Todo内容" />
      <Typography>概要</Typography>
      <div>{todo.overview}</div>
      <Typography>期限</Typography>
      <div>{todo.deadline}</div>
      <Typography>優先度</Typography>
      <div>{todo.priority}</div>
      <Typography>詳細</Typography>
      <div>{todo.details}</div>
    </>
  );
};

export default withRouter(View);
