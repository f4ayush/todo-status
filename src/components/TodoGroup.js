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
import { v4 as uuidv4 } from "uuid";

function TodoGroup() {
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();

  const handleAddGroup = (e) => {
    dispatch(createGroup({ id: uuidv4(), from: 0, to: 0 }));
  };
  const updateFrom = (event, gId) => {
    if (!isNaN(parseInt(event.target.value)) || event.target.value == "") {
      dispatch(
        editGroup({ value: parseInt(event.target.value) || 0, gId, from: true })
      );
    }
  };

  const updateTo = (event, gId) => {
    if (!isNaN(parseInt(event.target.value)) || event.target.value == "") {
      dispatch(
        editGroup({ value: parseInt(event.target.value) || 0, gId, to: true })
      );
    }
  };

  return (
    <Box data-testid="group-container">
      {groups.groups.map((group, index) => (
        <Stack
          key={group.id}
          direction="row"
          gap="10%"
          flexWrap="wrap"
          sx={{ marginBottom: "5px" }}
          data-testid="group-item"
        >
          <Stack
            direction="row"
            gap="0"
            alignItems="center"
            width="fit-content"
          >
            {/* {console.log(group)} */}
            <DeleteIcon data-testid="delete-btn" onClick={() => dispatch(deleteGroup(group.id))} />
            <Stack direction="row" sx={{ height: "50px" }}>
              <Button variant="outlined" sx={{ height: "50px" }}>{`Group ${index + 1
                }`}</Button>
              <TextField
                variant="outlined"
                sx={{ width: "50px" }}
                data-testid="from"
                inputProps={{
                  style: {
                    width: "50px",
                    height: "50px",
                    padding: "0.5px 14px"
                  },
                }}
                value={group.from}
                onChange={(e) => updateFrom(e, group.id)}
              />
              <Button variant="outlined">
                <ArrowForwardIcon />
              </Button>
              <TextField
                variant="outlined"
                value={group.to}
                sx={{ width: "50px" }}
                data-testid="to"
                inputProps={{
                  style: {
                    width: "50px",
                    height: "50px",
                    padding: "0.5px 14px"
                  },
                }}
                onChange={(e) => updateTo(e, group.id)}
              />
            </Stack>
          </Stack>
          <Typography
            data-testid="status"
            sx={{
              border: "1px solid gray",
              borderRadius: "2px",
              padding: "10px 5px",
              width: "40%",
            }}
          >
            {group.status}
          </Typography>
        </Stack>
      ))}
      {groups.error && <Alert severity="error" data-testid="error">{groups.error}</Alert>}
      {groups.groups.length < 5 && (
        <Stack sx={{ cursor: "pointer", margin: "8px 0" }} direction="row" alignItems="center" variant="div" data-testid="addBtn" onClick={handleAddGroup}>
          <AddIcon />
          <Typography>Add Items</Typography>
        </Stack>
      )}
    </Box>
  );
}

export default TodoGroup;
