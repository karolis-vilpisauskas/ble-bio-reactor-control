import { useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { BluetoothConnected, Bluetooth } from "@mui/icons-material";
import { useBluetoothContext } from "../../utils/Bluetooth";
import { useControlContext } from "../../utils/Control";

export default function Header() {
  const { getBleDevice, loading, isConnected } = useBluetoothContext();
  const { selectedControl } = useControlContext();

  const connectButtonInner = useMemo(() => {
    if (loading) return <CircularProgress color="secondary" size={20} />;
    if (isConnected) return <BluetoothConnected />;

    return <Bluetooth />;
  }, [isConnected, loading]);

  const connectButtonColor = useMemo(
    () => (isConnected ? "success" : "error"),
    [isConnected]
  );

  if (!isConnected || selectedControl === undefined) return null;

  return (
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
  );
}
