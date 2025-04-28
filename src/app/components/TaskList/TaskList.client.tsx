"use client";

import { Task } from "@prisma/client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import TaskItem from "../TaskItem/TaskItem.client";

interface TaskListProps {
  tasks: Task[];
  onDelete: (t: Task) => void;
  onEdit: (t: Task) => void;
  onToggleComplete: (t: Task) => void;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskListProps) {
  return (
    <Box position="relative" width="100%" height="100%" p={0}>
      {/* scrollable, focusable, labelled region */}
      <Box
        component="section"
        role="region"
        aria-label="Tasks"
        tabIndex={0}
        sx={{
          position: "relative",
          overflow: "auto",
          width: "100%",
          height: "100%",
          p: { xs: 0, md: 2 },
          "&:focus": {
            outline: (theme) => `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        {tasks.length > 0 ? (
          <List>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </List>
        ) : (
          <Box
            role="status"
            aria-live="polite"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h5">Add a Task!</Typography>
          </Box>
        )}
      </Box>

      {/* decorative fades */}
      <Box
        aria-hidden="true"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height={40}
        sx={{
          pointerEvents: "none",
          backgroundImage: (theme) =>
            `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent)`,
        }}
      />
      <Box
        aria-hidden="true"
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
        height={40}
        sx={{
          pointerEvents: "none",
          backgroundImage: (theme) =>
            `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
        }}
      />
    </Box>
  );
}
