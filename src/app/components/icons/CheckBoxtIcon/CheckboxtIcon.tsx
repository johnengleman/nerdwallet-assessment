"use client";

import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SelectIconProps {
  onClick: (e: React.MouseEvent) => void;
  completed: boolean;
}

export default function SelectIcon({ onClick, completed }: SelectIconProps) {
  return (
    <Checkbox
      onClick={onClick}
      checked={completed}
      icon={<CheckCircleOutlineIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{
        p: 0,
        color: "grey.400",
        "& .MuiSvgIcon-root": { fontSize: 20 },
        "&.Mui-checked": { color: "success.main" },
        cursor: "pointer",
        transition: "color 100ms",
      }}
    />
  );
}
