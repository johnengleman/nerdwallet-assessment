// TaskList.client.tsx
"use client";

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
    <div className="relative h-full w-full">
      <div
        className="
          overflow-y-scroll h-full w-full p-4 flex flex-col space-y-3
          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
        "
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleComplete={onToggleComplete}
            />
          ))
        ) : (
          <p className="text-2xl text-center block mt-20">Add a Task!</p>
        )}
      </div>

      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-10 
                      bg-gradient-to-b from-white to-transparent"
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-10 
                      bg-gradient-to-t from-white to-transparent"
      />
    </div>
  );
}
