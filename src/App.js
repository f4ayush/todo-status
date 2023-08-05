import TodoGroup from "./components/TodoGroup"
import StatusButton from "./components/StatusButton"
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAsync, getTodos } from "./redux/slices/todo";
import { createGroup, getGroups } from "./redux/slices/groups";


function App() {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const groups = useSelector(getGroups);
  useEffect(() => {
    dispatch(fetchTodosAsync())
  }, [])

  useEffect(() => {
    if(todos.length > 0 && groups.groups.length < 1){
      dispatch(createGroup({
        id: 1,
        from: 1,
        to: 10,
        todos:[],
        status: ""
      }))
    }
    console.log(todos)
  }, [todos])
  
  
  return (
    <div className="App">
      <TodoGroup />
      <StatusButton/>
    </div>
  );
}

export default App;
