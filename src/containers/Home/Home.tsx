import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Pages } from "../../constants/Pages";

interface Props {
  sendData: any;
}

const page = Pages.Home;

export default function Home({ sendData }: Props) {
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
      sendData({
        page,
        element,
        changed: 0,
        value: 0,
      });
    },
    [sendData]
  );

  const handleSetRpm = useCallback(() => {
    sendData({
      page,
      element: 1,
      changed: 1,
      value: rpm * 100,
    });
  }, [rpm, sendData]);

  const handleSetDirection = useCallback(() => {
    sendData({
      page,
      element: 2,
      changed: 1,
      value: dir,
    });
  }, [dir, sendData]);

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        size="small"
        label="rpm"
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
        Set Rpm
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
    </Box>
  );
}
