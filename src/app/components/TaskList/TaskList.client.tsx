"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Task } from "@prisma/client";
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
    <Box position="relative" width="100%" height="100%">
      {/* scrollable content */}
      <Box position="relative" overflow="auto" width="100%" height="100%" p={2}>
        {tasks.length > 0 ? (
          <Stack spacing={2}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </Stack>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h5">Add a Task!</Typography>
          </Box>
        )}
      </Box>

      {/* top fade */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height={40}
        sx={{
          pointerEvents: "none",
          backgroundImage: (theme) =>
            "linear-gradient(to bottom, " +
            theme.palette.background.paper +
            ", transparent)",
        }}
      />

      {/* bottom fade */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
        height={40}
        sx={{
          pointerEvents: "none",
          backgroundImage: (theme) =>
            "linear-gradient(to top, " +
            theme.palette.background.paper +
            ", transparent)",
        }}
      />
    </Box>
  );
}
