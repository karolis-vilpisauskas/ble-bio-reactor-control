import { useCallback, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import CardHeader from "../../../../../components/CardHeader/CardHeader";
import { useBluetoothContext } from "../../../../../utils/Bluetooth";
import { Tabs } from "../../../../../constants/Tabs";

const page = Tabs.Rate;

export default function Rate() {
  const { sendData } = useBluetoothContext();

  const [speed, setSpeed] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [acceleration, setAcceleration] = useState<number>(0);

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

  const handleSpeedChange = useCallback((e: any) => {
    const value = e.target.value;
    setSpeed(value);
  }, []);

  const handleMaxSpeedChange = useCallback((e: any) => {
    const value = e.target.value;
    setMaxSpeed(value);
  }, []);

  const handleAccelerationChange = useCallback((e: any) => {
    const value = e.target.value;
    setAcceleration(value);
  }, []);

  const handleSetSpeed = useCallback(() => {
    sendData?.({
      page,
      element: 2,
      changed: 1,
      value: speed * 100,
    });
  }, [sendData, speed]);

  const handleSetMaxSpeed = useCallback(() => {
    sendData?.({
      page,
      element: 3,
      changed: 1,
      value: maxSpeed * 100,
    });
  }, [sendData, maxSpeed]);

  const handleSetAcceleration = useCallback(() => {
    sendData?.({
      page,
      element: 4,
      changed: 1,
      value: acceleration * 100,
    });
  }, [sendData, acceleration]);

  return (
    <Box display="flex" flexDirection="column">
      <CardHeader title="Rate" />
      <Typography variant="h6">Pumped mass (g):</Typography>
      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
        0.0
      </Typography>
      <Divider sx={{ marginBottom: "20px", marginTop: "10px" }} />
      <TextField
        size="small"
        label="Speed Setpoint (g/h)"
        type="number"
        value={speed}
        onChange={handleSpeedChange}
        onFocus={handleFocus(2)}
      />
      <Button
        sx={{ marginTop: "10px", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSetSpeed}
      >
        Set Speed Setpoint
      </Button>
      <TextField
        size="small"
        label="Max Speed (g/h)"
        type="number"
        value={maxSpeed}
        onChange={handleMaxSpeedChange}
        onFocus={handleFocus(3)}
      />
      <Button
        sx={{ marginTop: "10px", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSetMaxSpeed}
      >
        Set Max Speed
      </Button>
      <TextField
        size="small"
        label="Acceleration (g/h^2)"
        type="number"
        value={acceleration}
        onChange={handleAccelerationChange}
        onFocus={handleFocus(4)}
      />
      <Button
        sx={{ marginTop: "10px", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSetAcceleration}
      >
        Set Acceleration
      </Button>
    </Box>
  );
}
