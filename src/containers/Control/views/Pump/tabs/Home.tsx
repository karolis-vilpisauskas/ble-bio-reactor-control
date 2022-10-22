import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import CardHeader from "../../../../../components/CardHeader/CardHeader";
import { Tabs } from "../../../../../constants/Tabs";
import { useBluetoothContext } from "../../../../../utils/Bluetooth";

const page = Tabs.Home;

export default function Home() {
  const { sendData } = useBluetoothContext();
  const [rpm, setRpm] = useState<number>(0.0);
  const [dir, setDir] = useState<number>(0);

  const handleRpmChange = useCallback((e: any) => {
    const value = e.target.value;
    setRpm(value);
  }, []);

  const handleDirChange = useCallback((e: any) => {
    const value = e.target.value;
    setDir(value);
  }, []);

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

  const handleSetRpm = useCallback(() => {
    sendData?.({
      page,
      element: 1,
      changed: 1,
      value: rpm * 100,
    });
  }, [rpm, sendData]);

  const handleSetDirection = useCallback(() => {
    sendData?.({
      page,
      element: 2,
      changed: 1,
      value: dir,
    });
  }, [dir, sendData]);

  return (
    <Box display="flex" flexDirection="column">
      <CardHeader title="Home" />
      <TextField
        size="small"
        label="RPM"
        type="number"
        value={rpm}
        onChange={handleRpmChange}
        onFocus={handleFocus(1)}
      />
      <Button
        sx={{ marginTop: "10px", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSetRpm}
      >
        Set RPM
      </Button>
      <FormControl>
        <FormLabel id="direction-group-label">Direction</FormLabel>
        <RadioGroup
          aria-labelledby="direction-group-label"
          value={dir}
          onChange={handleDirChange}
          name="radio-buttons-group"
          onFocus={handleFocus(2)}
          row
        >
          <FormControlLabel value={0} control={<Radio />} label="Left" />
          <FormControlLabel value={1} control={<Radio />} label="Right" />
        </RadioGroup>
      </FormControl>
      <Button
        sx={{ marginTop: "10px" }}
        variant="contained"
        onClick={handleSetDirection}
      >
        Set Direction
      </Button>
      <Divider />
      <Typography variant="h6" marginTop="10px">
        Scales:
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
        0.0
      </Typography>
    </Box>
  );
}
