import TodoGroup from "./components/TodoGroup";
import StatusButton from "./components/StatusButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodosAsync, getTodos } from "./redux/slices/todo";
import { createGroup, getGroups } from "./redux/slices/groups";
import { Container, Typography } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const groups = useSelector(getGroups);
  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  useEffect(() => {
    if (todos.length > 0 && groups.groups.length < 1) {
      dispatch(
        createGroup({
          id: 1,
          from: 1,
          to: 10,
          status: "",
        })
      );
    }
  }, [todos]);

  return (
    <Container maxWidth="lg" sx={{ padding: "10px" }} className="App">
      <Typography variant="h5" component="h2" textAlign="center">
        TODO Status
      </Typography>
      <TodoGroup />
      <StatusButton />
    </Container>
  );
}

export default App;
