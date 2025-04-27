"use client";

import { useState, useTransition, useOptimistic } from "react";
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
      // 1) optimistic
      setTasks(nextTasks);

      // 2) persist
      const saved: Task = await UpsertTodoAction(
        isEdit ? data.id! : undefined,
        data.title,
        data.description,
        priorityNum
      );

      // 3) swap out temp for real
      const finalTasks = nextTasks.map((t) => (t.id === tempId ? saved : t));
      setTasks(finalTasks);
    });

    setCreating(false);
    setEditing(null);
  };

  const handleToggle = (t: Task) => {
    const nextTasks = tasks.map((x) =>
      x.id === t.id ? { ...x, completed: !x.completed } : x
    );

    startTransition(async () => {
      setTasks(nextTasks);
      await ToggleTaskCompletedAction(t.id, !t.completed);
    });
  };

  const handleDelete = (t: Task) => {
    const nextTasks = tasks.filter((x) => x.id !== t.id);
    startTransition(async () => {
      setTasks(nextTasks);
      await DeleteTaskAction(t.id);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {(creating || editing) && (
        <Modal
          onClose={() => !isPending && (setCreating(false), setEditing(null))}
        >
          <UpsertForm
            task={editing ?? undefined}
            onSave={handleUpsert}
            onClose={() => (setCreating(false), setEditing(null))}
          />
        </Modal>
      )}

      <div className="flex h-[500px] w-[1000px] gap-4">
        <div className="w-1/4 p-4 shadow-md border border-gray-200">
          <AddTask onAdd={() => setCreating(true)} />

          <div>High {priorityCounts.high}</div>
          <div>Medium {priorityCounts.medium}</div>
          <div>Low {priorityCounts.low}</div>
        </div>
        <div className="w-3/4 p-4 shadow-md border border-gray-200">
          <TaskList
            tasks={tasks}
            onEdit={(t) => setEditing(t)}
            onToggleComplete={handleToggle}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
