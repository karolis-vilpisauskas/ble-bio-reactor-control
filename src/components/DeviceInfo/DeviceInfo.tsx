import { Card, CardContent, Typography, Box } from "@mui/material";
import { useBluetoothContext } from "../../utils/Bluetooth";
import CardHeader from "../CardHeader/CardHeader";

export default function DeviceInfo() {
  const { isConnected, deviceName, deviceId } = useBluetoothContext();

  return (
    <Card>
      <CardContent>
        <CardHeader title="Device" />
        <Box>
          {isConnected ? (
            <>
              <Typography variant="subtitle1">Name: {deviceName}</Typography>
              <Typography variant="subtitle1">ID: {deviceId}</Typography>
            </>
          ) : (
            <Typography variant="subtitle1">
              <b>No device connected</b>
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
