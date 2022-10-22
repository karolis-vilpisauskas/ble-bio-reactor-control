import { Box, Typography, Divider } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

export default function CardHeader({ title }: Props) {
  return (
    <Box marginBottom="10px">
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        {title}
      </Typography>
      <Divider />
    </Box>
  );
}
