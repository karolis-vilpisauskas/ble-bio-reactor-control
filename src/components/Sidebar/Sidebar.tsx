import { useCallback, useState } from "react";
import { Menu } from "@mui/icons-material";
import { Drawer, Grid, IconButton, useTheme } from "@mui/material";
import Commands from "../Commands/Commands";
import DeviceInfo from "../DeviceInfo/DeviceInfo";

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          border: `${theme.palette.primary.main} solid 1px`,
        }}
      >
        <Menu color="primary" />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiPaper-root.MuiDrawer-paper": {
            width: "90%",
            maxWidth: 500,
            paddingTop: "10px",
          },
        }}
      >
        <Grid
          container
          direction="column"
          spacing={2}
          padding="15px"
          wrap="nowrap"
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Grid item>
            <DeviceInfo />
          </Grid>
          <Grid
            item
            flexGrow={1}
            sx={{
              width: "100%",
              maxHeight: "70vh",
            }}
          >
            <Commands />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
