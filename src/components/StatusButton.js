import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createGroup, getGroups, deleteGroup, getStatusAsync } from "../redux/slices/groups";
import Button from '@mui/material/Button';
function StatusButton() {
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();
  return (
    <Button onClick={()=>dispatch(getStatusAsync(groups.groups))}>Status Button</Button>
  )
}

export default StatusButton