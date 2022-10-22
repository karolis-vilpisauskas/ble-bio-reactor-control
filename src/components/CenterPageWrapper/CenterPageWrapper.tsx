import { forwardRef, PropsWithChildren, Ref } from "react";
import { Box } from "@mui/material";

function CenterPageWrapper(
  { children }: PropsWithChildren<{}>,
  ref: Ref<unknown>
) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
      }}
      ref={ref}
    >
      {children}
    </Box>
  );
}

export default forwardRef(CenterPageWrapper);
