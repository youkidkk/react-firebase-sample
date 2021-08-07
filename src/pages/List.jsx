import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from "auth/AuthProvider";
import { getTodos } from "firebase-db";
import { useContext, useEffect, useState } from "react";

const columns = [
  { field: "overview", headerName: "概要", sortable: false, flex: 1 },
  { field: "priority", headerName: "優先度", sortable: true, minWidth: 150 },
  { field: "deadline", headerName: "期限", sortable: true, minWidth: 150 },
];

const Todos = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const asyncGetter = async () => {
      const list = await getTodos(currentUser.uid);
      setTodos(
        list.map((data) => {
          return {
            id: data.id,
            overview: data.overview,
            priority: data.priority,
            deadline: data.deadline,
          };
        })
      );
    };
    asyncGetter();
  });

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
