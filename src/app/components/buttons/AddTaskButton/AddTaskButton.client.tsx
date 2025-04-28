"use client";

import Button from "@mui/material/Button";

interface AddTaskProps {
  onAdd: (status: boolean) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  return (
    <Button
      variant="contained"
      color="warning"
      sx={{ px: 4, py: 1, width: { xs: "default", md: "100%" } }}
      onClick={() => onAdd(true)}
    >
      Add Task
    </Button>
  );
}
