import { Button, Card, CardContent, Grid } from "@mui/material";
import { useCallback } from "react";
import CenterPageWrapper from "../../../../components/CenterPageWrapper/CenterPageWrapper";
import StirrerControl from "../../../../components/StirrerControl/StirrerControl";
import { ControlEnum } from "../../../../types/Control";
import { useBluetoothContext } from "../../../../utils/Bluetooth";
import { useControlContext } from "../../../../utils/Control";

const defaultPage = 1;

export default function Stirrer() {
  const { sendData } = useBluetoothContext();
  const { selectedControl } = useControlContext();

  const handleSetPage = useCallback(() => {
    sendData?.({
      page: defaultPage,
      element: 0,
      value: 0,
      changed: 0,
    });
  }, [sendData]);

  if (selectedControl !== ControlEnum.Stirrer) return null;

  return (
    <CenterPageWrapper>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            onClick={handleSetPage}
            sx={{
              marginBottom: "20px",
            }}
          >
            Set page
          </Button>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <StirrerControl sendData={sendData} elementIndex={1} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StirrerControl sendData={sendData} elementIndex={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StirrerControl sendData={sendData} elementIndex={3} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StirrerControl sendData={sendData} elementIndex={4} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CenterPageWrapper>
  );
}
