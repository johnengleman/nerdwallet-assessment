"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface AddTaskProps {
  onAdd: (status: boolean) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  return (
    <Box m={4}>
      <Button
        variant="contained"
        color="warning"
        sx={{ px: 4, py: 1 }}
        onClick={() => onAdd(true)}
      >
        Add Task
      </Button>
    </Box>
  );
}
