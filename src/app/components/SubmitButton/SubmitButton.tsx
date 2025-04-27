"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="warning"
      disabled={pending}
      startIcon={
        pending ? <CircularProgress size={20} color="inherit" /> : undefined
      }
      sx={{ px: 3, py: 1 }}
    >
      {pending ? "Adding..." : text}
    </Button>
  );
}
