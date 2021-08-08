import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from "auth/AuthProvider";
import { getTodos } from "firebase-db";
import { useContext, useEffect, useState } from "react";

const columns = [
  { field: "overview", headerName: "概要", sortable: false, flex: 1 },
  { field: "priority", headerName: "優先度", sortable: true, minWidth: 150 },
  { field: "deadline", headerName: "期限", sortable: true, minWidth: 150 },
];

const getTodosAsync = async (uid, setTodos) => {
  try {
    setTodos(await getTodos(uid));
  } catch (error) {
    console.log(error);
  }
};

const Todos = (props) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  const [todos, setTodos] = useState([]);
  useEffect(() => getTodosAsync(uid, setTodos), [uid]);

  return (
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
    />
  );
};

export default Todos;
