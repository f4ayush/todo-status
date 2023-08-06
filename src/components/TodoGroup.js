import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createGroup,
  getGroups,
  deleteGroup,
  editGroup,
} from "../redux/slices/groups";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from 'uuid';

function TodoGroup() {
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();

  const handleAddGroup = (e) => {
    dispatch(createGroup({ id: uuidv4(), from: 0, to: 0 }));
  };
  const updateFrom = (event, gId) => {
    dispatch(
      editGroup({ value: parseInt(event.target.value) || 0, gId, from: true })
    );
  };

  const updateTo = (event, gId) => {
    dispatch(
      editGroup({ value: parseInt(event.target.value) || 0, gId, to: true })
    );
  };
  return (
    <Box>
      {groups.groups.map((group, index) => (
        <Stack key={group.id} direction="row" gap="10%" flexWrap="wrap">
          <Stack direction="row" gap="0">
            {console.log(group)}
            <DeleteIcon onClick={() => dispatch(deleteGroup(group.id))} />
            <Stack direction="row">
              <Button variant="outlined">{`Group ${index+1}`}</Button>
              <TextField
                hiddenLabel
                variant="outlined"
                value={group.from}
                onChange={(e) => updateFrom(e, group.id)}
              />
              <Button variant="outlined">
                <ArrowForwardIcon />
              </Button>
              <TextField
                variant="outlined"
                value={group.to}
                onChange={(e) => updateTo(e, group.id)}
              />
            </Stack>
          </Stack>
            <Typography sx={{ border:"1px solid gray", borderRadius:"2px", padding: "10px 5px" }}>{group.status}</Typography>
        </Stack>
      ))}
      {groups.error && <Alert severity="error">{groups.error}</Alert>}
      <Typography sx={{ cursor: "pointer" }} onClick={handleAddGroup}>
        <AddIcon /> Add Items
      </Typography>
    </Box>
  );
}

export default TodoGroup;
