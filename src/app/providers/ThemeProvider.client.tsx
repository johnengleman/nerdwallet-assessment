"use client";

import React, { useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { lightTheme, darkTheme } from "../../theme";

export default function ThemeToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = mode === "light" ? lightTheme : darkTheme;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
        }}
      >
        <IconButton
          onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
          sx={{ position: "fixed", top: 16, right: 16 }}
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        {children}
      </Box>
    </MuiThemeProvider>
  );
}
