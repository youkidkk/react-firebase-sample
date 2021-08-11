import { Box, Button, Card, makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from "auth/AuthProvider";
import { DATE_FORMAT_DISPLAY, PRIORITY_DISPLAY } from "common/common-const";
import ContentsTitle from "components/ContentsTitle";
import dateformat from "dateformat";
import { getTodos } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: "1rem",
  },
}));

const columns = [
  {
    field: "priorityDisplay",
    headerName: "優先度",
    sortable: true,
    minWidth: 150,
  },
  {
    field: "deadlineDisplay",
    headerName: "期限",
    sortable: true,
    minWidth: 150,
  },
  { field: "overview", headerName: "概要", sortable: false, flex: 1 },
];

const getTodosAsync = async (uid, setTodos) => {
  try {
    const todos = await getTodos(uid);
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          priorityDisplay: PRIORITY_DISPLAY[todo.priority],
          deadlineDisplay: dateformat(
            new Date(todo.deadline),
            DATE_FORMAT_DISPLAY
          ),
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const List = () => {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const history = useHistory();
  const [todos, setTodos] = useState([]);
  useEffect(() => getTodosAsync(uid, setTodos), [uid]);

  const handleCreateButtonClick = () => {
    history.push("/todos/create");
  };

  const handleRowClick = (params, event) => {
    history.push(`/todos/view/${params.id}`);
  };

  return (
    <>
      <Card className={classes.card}>
        <ContentsTitle title="Todo一覧" />
        <Box mb={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleCreateButtonClick}>新規作成</Button>
        </Box>
        <DataGrid
          rows={todos}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={10}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableSelectionOnClick
          onRowClick={handleRowClick}
        />
      </Card>
    </>
  );
};

export default List;
