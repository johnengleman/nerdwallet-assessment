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

  const dialogTitleId = `delete-task-dialog-title-${task.id}`;
  const dialogDescId = `delete-task-dialog-desc-${task.id}`;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          sx={{
            border: "1px solid transparent",
            borderRadius: 1,
            p: 1.5,
            "&:hover": { borderColor: "grey.400" },
            "&:focus-visible": {
              outline: (theme) => `2px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={task.completed}
              disableRipple
              onClick={handleToggle}
              inputProps={{
                "aria-label": task.completed
                  ? `Mark "${task.title}" as incomplete`
                  : `Mark "${task.title}" as complete`,
              }}
            />
          </ListItemIcon>

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="title"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "text.disabled" : "text.primary",
              }}
            >
              {task.title}{" "}
              <Typography
                component="span"
                variant="priority"
                color="info.main"
                sx={{
                  textTransform: "lowercase",
                  color: task.completed ? "text.disabled" : "info.main",
                }}
              >
                ({priorityMap(task.priority)})
              </Typography>
            </Typography>
            <Typography
              variant="description"
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

          <IconButton
            edge="end"
            onClick={handleDeleteClick}
            aria-label={`Delete task: ${task.title}`}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
      </ListItem>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescId}
        slotProps={{
          paper: {
            sx: { p: 4, borderRadius: 2, minWidth: 300 },
            elevation: 8,
          },
        }}
      >
        <DialogTitle id={dialogTitleId}>Delete “{task.title}”?</DialogTitle>
        <DialogContent>
          <DialogContentText id={dialogDescId}>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onDelete(task)}
            color="primary"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => setConfirmDelete(false)}
            color="secondary"
            variant="outlined"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const priorityMap = (p: number | null): string =>
  p === 1 ? "High" : p === 2 ? "Medium" : "Low";
