import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: CSSProperties;
    description: CSSProperties;
    priority: CSSProperties;
  }
  interface TypographyVariantsOptions {
    title?: CSSProperties;
    description?: CSSProperties;
    priority?: CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    description: true;
    priority: true;
  }
}

export const lightTheme = createTheme({
  palette: { mode: "light" },
  typography: {
    title: {
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    description: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
    priority: {
      fontWeight: 400,
      fontSize: "0.675rem",
      lineHeight: 1.4,
    },
  },
});

export const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: {
    title: {
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    description: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
    priority: {
      fontWeight: 400,
      fontSize: "0.675rem",
      lineHeight: 1.4,
    },
  },
});
