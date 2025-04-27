"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export interface UpsertData {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface UpsertFormProps {
  task?: {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    priority: number | null;
  };
  onSave: (data: UpsertData) => void;
  onClose: () => void;
}

export default function UpsertForm({ task, onSave, onClose }: UpsertFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<UpsertData["priority"]>(() => {
    switch (task?.priority) {
      case 1:
        return "high";
      case 2:
        return "medium";
      case 3:
        return "low";
      default:
        return "medium";
    }
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Please enter a title.");
      return;
    }
    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      completed: task?.completed ?? false,
      priority,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          width: 400,
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => {
            setErrorMessage(null);
            setTitle(e.target.value);
          }}
          required
          error={!!errorMessage}
          helperText={errorMessage ?? undefined}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />

        <FormControl>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            label="Priority"
            onChange={(e) =>
              setPriority(e.target.value as UpsertData["priority"])
            }
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          {task ? "Save Changes" : "Add Task"}
        </Button>
      </Box>
    </form>
  );
}
