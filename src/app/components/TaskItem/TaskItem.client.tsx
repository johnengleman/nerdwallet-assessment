import { useState } from "react";
import SelectIcon from "../SelectIcon/SelectIcon";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import Modal from "../Modal/Modal";
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
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    setConfirmDelete(true);
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
    <>
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
      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(false)}>
          <div className="p-10 flex flex-col gap-10">
            <p className="block tx-lg font-bold">
              Are you sure you want to delete this task?
            </p>
            <div className="flex gap-6 w-full justify-between ">
              <button
                className="p-2 bg-green-800 w-1/3 cursor-pointer text-white rounded shadow"
                onClick={() => onDelete(task)}
              >
                Yes
              </button>
              <button
                className="p-2 bg-amber-800 w-1/3 cursor-pointer text-white rounded shadow"
                onClick={() => setConfirmDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskItem;
