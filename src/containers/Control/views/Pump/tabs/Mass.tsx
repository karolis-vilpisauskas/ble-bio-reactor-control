import { useCallback, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Tabs } from "../../../../../constants/Tabs";
import { useBluetoothContext } from "../../../../../utils/Bluetooth";
import CardHeader from "../../../../../components/CardHeader/CardHeader";

const page = Tabs.Mass;

export default function Mass() {
  const { sendData } = useBluetoothContext();

  const [mass, setMass] = useState<number>(0);
  const [pump, setPump] = useState<number>(0);

  const handleFocus = useCallback(
    (element: number) => () => {
      sendData?.({
        page,
        element,
        changed: 0,
        value: 0,
      });
    },
    [sendData]
  );

  const handleMassChange = useCallback((e: any) => {
    const value = e.target.value;
    setMass(value);
  }, []);

  const handlePumpChange = useCallback((e: any) => {
    const value = e.target.value;
    setPump(value);
  }, []);

  const handleSetMass = useCallback(() => {
    sendData?.({
      page,
      element: 2,
      changed: 1,
      value: mass * 100,
    });
  }, [sendData, mass]);

  const handleSetPump = useCallback(() => {
    sendData?.({
      page,
      element: 3,
      changed: 1,
      value: pump * 100,
    });
  }, [sendData, pump]);

  return (
    <Box display="flex" flexDirection="column">
      <CardHeader title="Mass" />
      <Typography variant="h6">Pumped mass (g):</Typography>
      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
        0.0
      </Typography>
      <Divider sx={{ marginBottom: "20px", marginTop: "10px" }} />
      <TextField
        size="small"
        label="Mass Setpoint (g)"
        type="number"
        value={mass}
        onChange={handleMassChange}
        onFocus={handleFocus(2)}
      />
      <Button
        sx={{ marginTop: "10px", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSetMass}
      >
        Set Mass Setpoint
      </Button>
      <TextField
        size="small"
        label="Pump Setpoint (RPM)"
        type="number"
        value={pump}
        onChange={handlePumpChange}
        onFocus={handleFocus(3)}
      />
      <Button
        sx={{ marginTop: "10px", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSetPump}
      >
        Set Pump Setpoint
      </Button>
    </Box>
  );
}
