import React, { useEffect, useState } from "react";
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

function TodoGroup() {
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();
  const [groupDetail, setGroupDetail] = useState([]);

  useEffect(() => {
    setGroupDetail(groups.groups);
  }, [groups]);

  const handleAddGroup = (e) => {
    dispatch(createGroup({ id: groups.groups.length + 1, from: 0, to: 0 }));
  };
  const updateFrom = (event, gId) => {
    console.log(event.target.value);
    const newGroups = groupDetail.map((group) => {
      if (group.id == gId) {
        console.log("yes");
        return { ...group, from: event.target.value };
      }
      return group;
    });

    dispatch(
      editGroup({ value: parseInt(event.target.value) || 0, gId, from: true })
    );

    setGroupDetail(newGroups);
  };

  const updateTo = (event, gId) => {
    console.log(event.target.value);
    const newGroups = groupDetail.map((group) => {
      if (group.id == gId) {
        console.log("yes");
        return { ...group, to: event.target.value };
      }
      return group;
    });
    setGroupDetail(newGroups);
    dispatch(
      editGroup({ value: parseInt(event.target.value) || 0, gId, to: true })
    );
  };
  return (
    <Box maxWidth="sm">
      {groups.groups.map((group) => (
        <Stack key={group.id} direction="row" useFlexGap flexWrap="wrap">
          <Stack direction="row" gap="10%">
            {console.log(group)}
            <DeleteIcon onClick={() => dispatch(deleteGroup(group.id))} />
            <Stack direction="row">
              <Button variant="outlined">{`Group ${group.id}`}</Button>
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
            <Typography sx={{ cursor: "pointer" }}>{group.status}</Typography>
          </Stack>
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
