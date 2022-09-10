import { BluetoothConnected, Bluetooth } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useMemo, useState, useCallback } from "react";
import { useBluetooth } from "../../utils/Bluetooth";

function App() {
  const { getBleDevice, deviceName, sendData, loading, isConnected } =
    useBluetooth();

  const [data, setData] = useState<string>("");

  const connectButtonInner = useMemo(() => {
    if (loading) return <CircularProgress color="primary" size={20} />;
    if (isConnected) return <BluetoothConnected />;

    return <Bluetooth />;
  }, [isConnected, loading]);

  const connectButtonColor = useMemo(
    () => (isConnected ? "success" : "error"),
    [isConnected]
  );

  const handleDataChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setData(e.target.value),
    []
  );

  const handleSendData = useCallback(() => {
    if (!data) return;
    sendData(data);
  }, [data, sendData]);

  return (
    <>
      <AppBar color="secondary" position="relative">
        <Toolbar>
          <Container>
            <IconButton
              onClick={getBleDevice}
              disabled={loading}
              style={{
                backgroundColor: connectButtonColor,
              }}
            >
              {connectButtonInner}
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Typography>Connected to: {deviceName}</Typography>
          <Box display="flex" flexDirection="column">
            <TextField
              variant="outlined"
              label="data"
              placeholder="Enter data to send..."
              onChange={handleDataChange}
              value={data}
            />
            <Button variant="contained" onClick={handleSendData}>
              Submit
            </Button>
          </Box>
        </Container>
      </main>
    </>
  );
}

export default App;
