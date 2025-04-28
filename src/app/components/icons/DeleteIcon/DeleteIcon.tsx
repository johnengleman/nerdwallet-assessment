"use client";

import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { MouseEventHandler } from "react";

interface DeleteIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteIcon({ onClick }: DeleteIconProps) {
  <IconButton
    onClick={onClick}
    sx={{
      width: 24,
      height: 24,
      p: 0,
      border: "2px solid transparent",
      borderRadius: "50%",
      transition: "border-color 0.1s",
      "&:hover": {
        borderColor: "error.main",
        backgroundColor: "transparent",
      },
    }}
  >
    <DeleteOutlineIcon
      sx={{
        fontSize: 12,
        color: "error.main",
        transition: "opacity 0.1s",
      }}
    />
  </IconButton>;
}
