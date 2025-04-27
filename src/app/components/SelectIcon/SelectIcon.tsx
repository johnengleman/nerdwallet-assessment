import React from "react";

interface SelectIconProps {
  onClick: () => void;
  completed: boolean;
}

const SelectIcon: React.FC<SelectIconProps> = ({ onClick, completed }) => (
  <div
    onClick={onClick}
    className={`group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 ${
      completed ? "border-green-500" : "border-gray-400 hover:border-green-500"
    } transition-colors duration-100`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      className={`h-4 w-4 text-green-500 transition-opacity duration-100 ${
        completed ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  </div>
);

export default SelectIcon;
