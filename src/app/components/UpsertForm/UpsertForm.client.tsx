// components/UpsertForm/UpsertForm.client.tsx
"use client";
import { useState } from "react";

// Now includes priority
export interface UpsertData {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface UpsertFormProps {
  // Task coming in may have a numeric priority
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

  // Map numeric priority → string for the select
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: task?.id,
      title,
      description,
      completed: task?.completed ?? false,
      priority,
    });
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 p-6 w-[400px]"
    >
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border px-2 py-1"
        required
      />

      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border px-2 py-1"
      />

      <label htmlFor="priority" className="block text-sm font-medium">
        Priority
      </label>
      <select
        id="priority"
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as UpsertData["priority"])}
        className="border px-2 py-1"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 rounded"
      >
        {task ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
}
