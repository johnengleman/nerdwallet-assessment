"use client";

import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <Dialog
      open
      onClose={onClose}
      container={() => document.getElementById("modal-root") ?? document.body}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.25)" } },
        paper: {
          sx: {
            border: 1,
            borderColor: "grey.200",
            borderRadius: 2,
            overflow: "visible",
          },
          elevation: 8,
        },
      }}
    >
      <Box>{children}</Box>
    </Dialog>
  );
}
