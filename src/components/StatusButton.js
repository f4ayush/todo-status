import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createGroup, getGroups, deleteGroup, getStatusAsync } from "../redux/slices/groups";
import Button from '@mui/material/Button';
import { getTodos } from '../redux/slices/todo';
function StatusButton() {
  const groups = useSelector(getGroups);
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();
  return (
    <Button onClick={()=>dispatch(getStatusAsync(groups.groups, todos))}>Status Button</Button>
  )
}

export default StatusButton