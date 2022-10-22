import { Bluetooth, Error } from "@mui/icons-material";
import { Typography, Box, Button, Fade, CircularProgress } from "@mui/material";
import CenterPageWrapper from "../../components/CenterPageWrapper/CenterPageWrapper";
import { useBluetoothContext } from "../../utils/Bluetooth";

export default function Connect() {
  const { isConnected, loading, getBleDevice, isBluetoothAvailable } =
    useBluetoothContext();

  if (!isBluetoothAvailable)
    return (
      <CenterPageWrapper>
        <Typography variant="h4" align="center">
          Bluetooth unavailable
        </Typography>
        <Error
          color="error"
          sx={{
            width: 150,
            height: 150,
          }}
        />
        <Typography align="center"></Typography>
        <Typography sx={{ marginTop: "20px" }}>
          Make sure you are using a chrome browser with the enabled bluetooth
          experimental feature.
        </Typography>
      </CenterPageWrapper>
    );

  if (isConnected) return null;

  return (
    <CenterPageWrapper>
      <Typography variant="h4" align="center">
        {!loading ? "Connect to continue" : "Waiting for device..."}
      </Typography>
      <Box mt="30px" position="relative">
        <Fade in={!loading}>
          <Bluetooth
            color="primary"
            sx={{ width: 150, height: 150, position: "absolute" }}
          />
        </Fade>
        <Fade in={loading}>
          <CircularProgress size={150} />
        </Fade>
      </Box>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          width: 250,
          marginTop: "40px",
          fontSize: 18,
        }}
        onClick={getBleDevice}
        disabled={loading}
      >
        Connect
      </Button>
    </CenterPageWrapper>
  );
}
