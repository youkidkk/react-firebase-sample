import { Box, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from "auth/AuthProvider";
import ContentsTitle from "components/ContentsTitle";
import { getTodos } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

const columns = [
  {
    field: "priorityDisplay",
    headerName: "優先度",
    sortable: true,
    minWidth: 150,
  },
  { field: "deadline", headerName: "期限", sortable: true, minWidth: 150 },
  { field: "overview", headerName: "概要", sortable: false, flex: 1 },
];

const getTodosAsync = async (uid, setTodos) => {
  try {
    setTodos(await getTodos(uid));
  } catch (error) {
    console.log(error);
  }
};

const List = () => {
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
    </>
  );
};

export default List;
