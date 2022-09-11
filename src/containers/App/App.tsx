import { BluetoothConnected, Bluetooth } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useMemo, useState, useCallback } from "react";
import { useBluetooth } from "../../utils/Bluetooth";

function App() {
  const {
    getBleDevice,
    deviceName,
    deviceId,
    sendData,
    loading,
    isConnected,
    commands,
  } = useBluetooth();

  const [data, setData] = useState<string>("");

  const connectButtonInner = useMemo(() => {
    if (loading) return <CircularProgress color="secondary" size={20} />;
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
      <AppBar color="primary" position="relative">
        <Toolbar>
          <Container>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">
                <i>Bio Reactor Control</i>
              </Typography>
              <IconButton
                onClick={getBleDevice}
                disabled={loading}
                color="secondary"
                style={{
                  backgroundColor: connectButtonColor,
                }}
              >
                {connectButtonInner}
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Box marginTop="20px">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Connected device</Typography>
                    <Box marginTop="20px">
                      {isConnected ? (
                        <>
                          {" "}
                          <Typography variant="subtitle1">
                            <b>Name:</b> {deviceName}
                          </Typography>
                          <Typography variant="subtitle1">
                            <b>ID:</b> {deviceId}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="subtitle1">
                          <b>No device connected</b>
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Send commands</Typography>
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 20,
                      }}
                    >
                      <TextField
                        variant="outlined"
                        label="data"
                        placeholder="Enter data to send..."
                        onChange={handleDataChange}
                        value={data}
                        disabled={!isConnected}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSendData}
                        style={{ marginTop: 20 }}
                        disabled={!isConnected}
                      >
                        Submit
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Received commands</Typography>
                    <Box
                      height="300px"
                      overflow="auto"
                      marginTop="20px"
                      padding="10px"
                      bgcolor="#E7E7E7"
                      borderRadius="6px"
                    >
                      {!commands?.length ? (
                        <Typography variant="subtitle1" color="textSecondary">
                          No commands received
                        </Typography>
                      ) : (
                        commands.map((command, i) => (
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            key={`command-${i}`}
                          >
                            {command}
                          </Typography>
                        ))
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </>
  );
}

export default App;
