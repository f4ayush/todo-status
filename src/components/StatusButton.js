import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getGroups, getStatus } from "../redux/slices/groups";
import Button from '@mui/material/Button';
import { getTodos } from '../redux/slices/todo';
function StatusButton() {
  const groups = useSelector(getGroups);
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();
  return (
    <Button variant="contained" data-testid="status-btn" onClick={()=>{dispatch(getStatus({groups: groups.groups, todos}))}}>Status Button</Button>
  )
}

export default StatusButton