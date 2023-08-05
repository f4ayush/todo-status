import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createGroup, getGroups, deleteGroup } from "../redux/slices/groups";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';


function TodoGroup() {
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();
  const handleAddGroup = (e)=>{
    dispatch(createGroup({id: groups.groups.length+1}))
    
  }
  const updateFrom = (event) =>{
    // const newValue = groups.filter(group=> group.id === event.target.data)
    
  }

  const updateTo = (event) =>{
    // const newValue = groups.filter(group=> group.id === event.target.data)

  }
  return (
    <Box maxWidth="sm">
      {
        groups.groups.map(group=>(
          <Stack key={group.id} direction="row" useFlexGap flexWrap="wrap">
            <Stack direction="row" gap="10%">
              {console.log(group)}
              <DeleteIcon  onClick={()=> dispatch(deleteGroup(group.id))}/>
              <Stack direction="row">
                <Button variant="outlined">{`Group ${group.id}`}</Button>
                <Input variant="outlined" data-id={group.id} value={group.from} onClick={updateFrom}/>
                <Button variant="outlined"><ArrowForwardIcon/></Button>
                <Input variant="outlined" data-id={group.id} value={group.to} onChange={updateFrom}/>
              </Stack>
              
              <Typography sx={{cursor:"pointer"}}>
                {
                  group.todos?.reduce((ac,todo)=>(
                    ` ${ac},(${todo.id}) ${todo.completed}`
                  ),"").replace(",","")
                }

                {group.status}
              </Typography>
            </Stack>
        </Stack>
        ))
      }

     
      <Typography sx={{cursor:"pointer"}} onClick={handleAddGroup}><AddIcon/> Add Items</Typography>
    </Box>
  )
}

export default TodoGroup