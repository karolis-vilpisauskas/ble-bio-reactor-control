import { Button, Card, CardContent, Grid } from "@mui/material";
import { useCallback } from "react";
import StirrerControl from "../../components/StirrerControl/StirrerControl";

interface Props {
  sendData: any;
}

const defaultPage = 1;

export default function Stirrer({ sendData }: Props) {
  const handleSetPage = useCallback(() => {
    sendData({
      page: defaultPage,
      element: 0,
      value: 0,
      changed: 0,
    });
  }, [sendData]);

  return (
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
  );
}
