import { Warning } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import CenterPageWrapper from "../../../../components/CenterPageWrapper/CenterPageWrapper";
import TabView from "../../../../components/TabView/TabView";
import { Tabs as TabEnum, tabViews } from "../../../../constants/Tabs";
import { ControlEnum } from "../../../../types/Control";
import { useBluetoothContext } from "../../../../utils/Bluetooth";
import { useControlContext } from "../../../../utils/Control";
import Home from "./tabs/Home";
import Mass from "./tabs/Mass";
import Options from "./tabs/Options";
import Rate from "./tabs/Rate";

export default function Pump() {
  const theme = useTheme();
  const { setPage, sendData, page } = useBluetoothContext();
  const { selectedControl } = useControlContext();

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage?.(newValue);
    sendData?.({
      page: newValue,
      element: 1,
      value: 0,
      changed: 0,
    });
  };

  const a11yProps = (index: number, value: number) => {
    return {
      id: `tab-${index}-${value}`,
      "aria-controls": `tabpanel-${index}-${value}`,
    };
  };

  if (typeof page !== "number")
    throw new Error("System error: Page must be a number.");

  if (selectedControl !== ControlEnum.Pump) return null;

  return (
    <>
      <AppBar
        color="transparent"
        variant="outlined"
        sx={{
          marginTop: "10px",
          width: "fit-content",
          left: "67px",
          borderRadius: "30px",
          height: "42px",
          borderColor: theme.palette.primary.main,
        }}
        component="div"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Tabs
            value={page}
            onChange={handlePageChange}
            aria-label="page-tabs"
            TabIndicatorProps={{
              sx: {
                width: page === 0 ? 0 : "45px !important",
                marginLeft: "15px",
                display: "block",
                marginBottom: "15px",
              },
            }}
          >
            <Tab
              value={0}
              sx={{
                "&.MuiTab-root": {
                  height: 0,
                  width: 0,
                  minWidth: 0,
                  minHeight: 0,
                  padding: 0,
                },
              }}
            />
            {tabViews.map(({ label, value }, index) => (
              <Tab
                label={label}
                value={value}
                sx={{
                  minHeight: "42px",
                  textTransform: "none",
                  paddingRight: 0,
                  paddingLeft: 0,
                  minWidth: 75,
                }}
                {...a11yProps(index, value)}
                key={`tab-${label}-${value}`}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <CenterPageWrapper>
        <Card sx={{ width: "100%", maxWidth: 500 }}>
          <CardContent>
            <TabView value={page} index={0}>
              <Grid container spacing={2}>
                <Grid item>
                  <Warning
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                    color="warning"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Select a page</Typography>
                </Grid>
              </Grid>
              <Typography color="textSecondary" sx={{ marginTop: "10px" }}>
                A page above needs to be selected in order to access it inside
                <br />
                the device.
              </Typography>
            </TabView>
            <TabView value={page} index={TabEnum.Home}>
              <Home />
            </TabView>
            <TabView value={page} index={TabEnum.Rate}>
              <Rate />
            </TabView>
            <TabView value={page} index={TabEnum.Mass}>
              <Mass />
            </TabView>
            <TabView value={page} index={TabEnum.Option}>
              <Options />
            </TabView>
          </CardContent>
        </Card>
      </CenterPageWrapper>
    </>
  );
}
