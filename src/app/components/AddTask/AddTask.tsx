"use client";

interface AddTaskProps {
  onAdd: (status: boolean) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const handleClick = () => {
    onAdd(true);
  };

  return (
    <>
      <button
        className="m-8 bg-amber-600 text-white px-10 py-2 rounded cursor-pointer"
        onClick={() => handleClick()}
      >
        Add Task
      </button>
    </>
  );
};

export default AddTask;
