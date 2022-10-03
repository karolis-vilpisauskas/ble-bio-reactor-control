import { TextField, Box, Button } from "@mui/material";
import React, { useCallback, useState } from "react";

interface Props {
  elementIndex: number;
  sendData: any;
}

const defaultPage = 1;

export default function StirrerControl({ elementIndex, sendData }: Props) {
  const [value, setValue] = useState<any>(0);
  const [error, setError] = useState<string>("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      error && setError("");
      setValue(e.target.value);
    },
    [error]
  );

  const handleFocus = useCallback(() => {
    setError("");
    sendData({
      page: defaultPage,
      element: elementIndex,
      value: 0,
      changed: 0,
    });
  }, [elementIndex, sendData]);

  const handleApply = useCallback(() => {
    if (value <= 0 || value >= 1000) {
      setError("Value has to be between 0 and 1000");
      return;
    }

    sendData({
      page: defaultPage,
      element: elementIndex,
      value: value * 100,
      changed: 1,
    });
  }, [elementIndex, sendData, value]);

  const handleStop = useCallback(() => {
    setError("");
    sendData({
      page: defaultPage,
      element: elementIndex,
      value: 0,
      changed: 1,
    });
    setValue(0);
  }, [elementIndex, sendData]);

  return (
    <Box marginBottom="20px">
      <TextField
        label={`Stirrer #${elementIndex}`}
        defaultValue={0}
        size="small"
        onChange={handleChange}
        value={value}
        onFocus={handleFocus}
        error={!!error}
        helperText={error}
        type="number"
      />
      <Box display="flex" alignItems="center" marginTop="10px">
        <Button color="primary" variant="contained" onClick={handleApply}>
          Apply RPM
        </Button>
        <Button variant="text" onClick={handleStop}>
          Stop
        </Button>
      </Box>
    </Box>
  );
}
