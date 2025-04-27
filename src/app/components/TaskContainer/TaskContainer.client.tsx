"use client";

import * as React from "react";
import { useState, useTransition, useOptimistic } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Task } from "@prisma/client";
import AddTask from "../AddTask/AddTask";
import TaskList from "../TaskList/TaskList.client";
import Modal from "../Modal/Modal";
import UpsertForm, { UpsertData } from "../UpsertForm/UpsertForm.client";
import UpsertTodoAction from "@/app/actions/UpsertTaskAction";
import ToggleTaskCompletedAction from "@/app/actions/ToggleTaskCompletedAction";
import DeleteTaskAction from "@/app/actions/DeleteTaskAction";
import { PriorityCounts } from "@/app/actions/GetPriorityCounts";

interface TaskContainerProps {
  initialTasks: Task[];
  priorityCounts: PriorityCounts;
}

export default function TaskContainer({
  initialTasks,
  priorityCounts,
}: TaskContainerProps) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [tasks, setTasks] = useOptimistic(
    initialTasks,
    (_old, incoming: Task[]) => incoming
  );
  const [isPending, startTransition] = useTransition();

  const handleUpsert = (data: UpsertData) => {
    const isEdit = typeof data.id === "number";
    const tempId = isEdit ? data.id! : Date.now();
    const priorityNum =
      data.priority === "high" ? 1 : data.priority === "medium" ? 2 : 3;
    const optimistic: Task = {
      id: tempId,
      title: data.title,
      description: data.description,
      completed: data.completed,
      priority: priorityNum,
      createdAt: new Date(),
    };
    const nextTasks = isEdit
      ? tasks.map((t) => (t.id === tempId ? optimistic : t))
      : [...tasks, optimistic];

    startTransition(async () => {
      setTasks(nextTasks);
      const saved: Task = await UpsertTodoAction(
        isEdit ? data.id! : undefined,
        data.title,
        data.description,
        priorityNum
      );
      setTasks(nextTasks.map((t) => (t.id === tempId ? saved : t)));
    });

    setCreating(false);
    setEditing(null);
  };

  const handleToggle = (t: Task) => {
    const next = tasks.map((x) =>
      x.id === t.id ? { ...x, completed: !x.completed } : x
    );
    startTransition(async () => {
      setTasks(next);
      await ToggleTaskCompletedAction(t.id, !t.completed);
    });
  };

  const handleDelete = (t: Task) => {
    const next = tasks.filter((x) => x.id !== t.id);
    startTransition(async () => {
      setTasks(next);
      await DeleteTaskAction(t.id);
    });
  };

  const closeModal = () => {
    if (!isPending) {
      setCreating(false);
      setEditing(null);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {(creating || editing) && (
        <Modal onClose={closeModal}>
          <UpsertForm
            task={editing ?? undefined}
            onSave={handleUpsert}
            onClose={() => {
              setCreating(false);
              setEditing(null);
            }}
          />
        </Modal>
      )}

      <Box display="flex" width={1000} height={500} gap={2}>
        <Paper variant="outlined" elevation={1} sx={{ width: "25%", p: 2 }}>
          <AddTask onAdd={() => setCreating(true)} />
          <Box mt={2}>
            <Typography>High {priorityCounts.high}</Typography>
            <Typography>Medium {priorityCounts.medium}</Typography>
            <Typography>Low {priorityCounts.low}</Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" elevation={1} sx={{ width: "75%", p: 2 }}>
          <TaskList
            tasks={tasks}
            onEdit={setEditing}
            onToggleComplete={handleToggle}
            onDelete={handleDelete}
          />
        </Paper>
      </Box>
    </Box>
  );
}
