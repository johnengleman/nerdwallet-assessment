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
  const [errorMessage, setErrorMessage] = useState<string | null>();
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

  const handleTitleChange = (e: React.KeyboardEvent) => {
    setErrorMessage("");
    setTitle(e.target.value);
  };

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

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const targetTagName = (e.target as Element).tagName.toLowerCase();

      if (targetTagName === "textarea") {
        return;
      }

      if (!task?.title) {
        setErrorMessage("Please enter a title.");
        return;
      }

      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleFormKeyDown}
      className="flex flex-col gap-y-4 p-6 w-[400px]"
    >
      <input
        name="title"
        value={title}
        onChange={(e) => handleTitleChange(e)}
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
      {errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>}
    </form>
  );
}
