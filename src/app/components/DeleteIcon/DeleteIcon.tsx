import React from "react";

interface SelectIconProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const DeleteIcon: React.FC<SelectIconProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className={`group relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-transparent hover:border-red-500 transition-colors duration-100`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      className="h-3 w-3 text-red-500 transition-opacity duration-100"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
);

export default DeleteIcon;
