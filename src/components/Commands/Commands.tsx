import { Card, CardContent, Typography, Box } from "@mui/material";
import { useBluetoothContext } from "../../utils/Bluetooth";
import CardHeader from "../CardHeader/CardHeader";

export default function Commands() {
  const { commands } = useBluetoothContext();

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "95%" }}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          overflow="hidden"
        >
          <CardHeader title="Terminal" />
          <Box
            overflow="auto"
            padding="10px"
            bgcolor="#E7E7E7"
            borderRadius="6px"
            flexGrow={1}
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
        </Box>
      </CardContent>
    </Card>
  );
}
