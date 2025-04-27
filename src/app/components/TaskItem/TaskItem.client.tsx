"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const priorityMap = (p: number | null): string => {
  switch (p) {
    case 1:
      return "High";
    case 2:
      return "Medium";
    case 3:
      return "Low";
    default:
      return "Low";
  }
};

export default function TaskItem({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
}: TaskItemProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(task);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDelete(true);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => onEdit(task)}
          sx={{
            border: "1px solid transparent",
            borderRadius: 1,
            p: 1.5,
            "&:hover": { borderColor: "grey.400" },
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.completed}
              disableRipple
              onClick={handleToggle}
            />
          </ListItemIcon>

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "text.disabled" : "text.primary",
              }}
            >
              {task.title}{" "}
              <Typography
                component="span"
                variant="caption"
                color="info.main"
                sx={{ textTransform: "capitalize" }}
              >
                ({priorityMap(task.priority)})
              </Typography>
            </Typography>

            <Typography
              variant="body2"
              component="div"
              sx={{
                mt: 0.5,
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "text.disabled" : "text.secondary",
              }}
            >
              {task.description}
            </Typography>
          </Box>

          <IconButton edge="end" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
      </ListItem>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        slotProps={{
          paper: {
            sx: {
              p: 4,
              borderRadius: 2,
              minWidth: 300,
            },
            elevation: 8,
          },
        }}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onDelete(task)}
            color="success"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => setConfirmDelete(false)}
            color="warning"
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
