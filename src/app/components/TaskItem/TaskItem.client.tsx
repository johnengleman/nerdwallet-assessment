"use client";

import SelectIcon from "../SelectIcon/SelectIcon";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import { Task } from "@prisma/client";

interface TaskItem {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskItem: React.FC<TaskItem> = ({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
}) => {
  const { title, description, completed, priority } = task;

  console.log(priority);

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    onToggleComplete(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task);
  };

  const priorityMap = (priority: number | null) => {
    switch (priority) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Low";
    }
  };

  return (
    <div
      onClick={() => {
        onEdit(task);
      }}
      className="flex gap-10 items-center m-b justify-between cursor-pointer border-1 border-transparent transition-border duration-100 hover:border-gray-400 p-3 rounded"
    >
      <SelectIcon
        onClick={(e) => handleToggleComplete(e)}
        completed={completed}
      />
      <div className="w-max flex flex-col justify-start flex-grow">
        <h3
          className={`text-lg font-bold items-center flex gap-2 ${
            completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {title}{" "}
          <span className="text-sm lowercase text-cyan-700">
            ({priorityMap(priority)})
          </span>
        </h3>
        <p
          className={`text-sm  ${
            completed ? "line-through text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>
      <DeleteIcon onClick={(e) => handleDelete(e)} />
    </div>
  );
};

export default TaskItem;
