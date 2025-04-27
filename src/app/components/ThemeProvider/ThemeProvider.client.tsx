"use client";

import { useState, useMemo, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface Props {
  children: ReactNode;
}

export function ThemeToggleProvider({ children }: Props) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
        }}
      >
        <IconButton onClick={toggleColorMode} color="inherit" size="large">
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Box>
      {children}
    </ThemeProvider>
  );
}
