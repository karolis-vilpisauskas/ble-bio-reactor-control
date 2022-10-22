import { SxProps, Theme } from "@mui/material";

export const classes: Record<string, SxProps<Theme>> = {
  card: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: 5,
    },
  },
};
