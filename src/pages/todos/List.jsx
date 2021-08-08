import { Box, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from "auth/AuthProvider";
import ContentsTitle from "components/ContentsTitle";
import { getTodos } from "firebase-db";
import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";

const columns = [
  { field: "priority", headerName: "優先度", sortable: true, minWidth: 150 },
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

const List = (props) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [todos, setTodos] = useState([]);
  useEffect(() => getTodosAsync(uid, setTodos), [uid]);

  const handleCreateButtonClick = () => {
    props.history.push("/todos/create");
  };

  const handleRowClick = (params, event) => {
    props.history.push(`/todos/view/${params.id}`);
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
        pageSize={5}
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

export default withRouter(List);
