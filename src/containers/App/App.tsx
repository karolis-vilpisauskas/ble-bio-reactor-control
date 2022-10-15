import { BluetoothConnected, Bluetooth } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useMemo, useState } from "react";
import TabView from "../../components/TabView/TabView";
import { Pages, pageTabs } from "../../constants/Pages";
import { useBluetooth } from "../../utils/Bluetooth";
import Home from "../Home/Home";
import Stirrer from "../Stirrer/Stirrer";

function App() {
  const {
    getBleDevice,
    deviceName,
    deviceId,
    sendData,
    loading,
    isConnected,
    commands,
    page,
    element,
    setPage,
    value,
  } = useBluetooth();

  const [selectedUI, setSelectedUI] = useState<number>(0);

  const connectButtonInner = useMemo(() => {
    if (loading) return <CircularProgress color="secondary" size={20} />;
    if (isConnected) return <BluetoothConnected />;

    return <Bluetooth />;
  }, [isConnected, loading]);

  const connectButtonColor = useMemo(
    () => (isConnected ? "success" : "error"),
    [isConnected]
  );

  const handleChangeUi = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedUI(parseInt(e.target.value));
    },
    []
  );

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
    sendData({
      page: newValue,
      element: 1,
      value: 0,
      changed: 0,
    });
  };

  const a11yProps = (index: number, value: number) => {
    return {
      id: `tab-${index}-${value}`,
      "aria-controls": `tabpanel-${index}-${value}`,
    };
  };

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
                          <Typography variant="subtitle1">
                            <b>Page:</b> {page}
                          </Typography>
                          <Typography variant="subtitle1">
                            <b>Element:</b> {element}
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
              <Grid item xs={12} sm={5}>
                <Card sx={{ marginBottom: "20px" }}>
                  <CardContent>
                    <FormControl>
                      <FormLabel id="ui-selector-group-label">
                        Select a UI to use:
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="ui-selector-group-label"
                        value={selectedUI}
                        onChange={handleChangeUi}
                        row
                      >
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label="Stirrer"
                        />
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label="Pump"
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
                {selectedUI === 0 && <Stirrer sendData={sendData} />}
                {selectedUI === 1 && (
                  <Card>
                    <CardContent>
                      <Tabs
                        value={page}
                        onChange={handlePageChange}
                        aria-label="page-tabs"
                      >
                        {pageTabs.map(({ label, value }, index) => (
                          <Tab
                            label={label}
                            value={value}
                            {...a11yProps(index, value)}
                          />
                        ))}
                      </Tabs>
                      <TabView value={page} index={Pages.Home}>
                        <Home sendData={sendData} />
                      </TabView>
                      <TabView value={page} index={Pages.Rate}>
                        Rate
                      </TabView>
                      <TabView value={page} index={Pages.Mass}>
                        Mass
                      </TabView>
                      <TabView value={page} index={Pages.Option}>
                        Options
                      </TabView>
                    </CardContent>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
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
