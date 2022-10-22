import { Container } from "@mui/system";
import { BluetoothProvider } from "../../utils/Bluetooth";
import { ControlProvider } from "../../utils/Control";
import Connect from "../Connect/Connect";
import ControlSelection from "../ControlSelection/ControlSelection";
import Control from "../Control/Control";
import Sidebar from "../../components/Sidebar/Sidebar";

function App() {
  return (
    <BluetoothProvider>
      <ControlProvider>
        {/* <Header /> */}
        <main>
          <Container>
            {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <DeviceInfo />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <ControlSelection />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Commands />
                </Grid>
              </Grid> */}
            <Connect />
            <ControlSelection />
            <Control />
            <Sidebar />
          </Container>
        </main>
      </ControlProvider>
    </BluetoothProvider>
  );
}

export default App;
