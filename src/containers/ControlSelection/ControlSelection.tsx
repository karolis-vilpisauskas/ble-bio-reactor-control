import { Blender, HeatPump } from "@mui/icons-material";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import CenterPageWrapper from "../../components/CenterPageWrapper/CenterPageWrapper";
import { ControlEnum } from "../../types/Control";
import { useBluetoothContext } from "../../utils/Bluetooth";
import { useControlContext } from "../../utils/Control";
import { classes } from "./ControlSelection.styles";

export default function ControlSelection() {
  const { isConnected } = useBluetoothContext();
  const { handleChangeControl, selectedControl } = useControlContext();

  if (!isConnected || selectedControl !== undefined) return null;

  return (
    <CenterPageWrapper>
      <Typography variant="h4">Select a device</Typography>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 0 }}>
        <Grid item>
          <Card
            square
            sx={classes.card}
            onClick={handleChangeControl?.(ControlEnum.Pump)}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <HeatPump
                color="primary"
                sx={{
                  height: 150,
                  width: 150,
                }}
              />
              <Typography variant="h6">Pump</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            square
            sx={classes.card}
            onClick={handleChangeControl?.(ControlEnum.Stirrer)}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Blender
                color="primary"
                sx={{
                  height: 150,
                  width: 150,
                }}
              />
              <Typography variant="h6">Stirrer</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CenterPageWrapper>
  );
}
