import { FormControlLabel, Checkbox } from "@mui/material";
import { useCallback, useState } from "react";
import CardHeader from "../../../../../components/CardHeader/CardHeader";
import { Tabs } from "../../../../../constants/Tabs";
import { useBluetoothContext } from "../../../../../utils/Bluetooth";

const page = Tabs.Option;

export default function Options() {
  const { sendData } = useBluetoothContext();

  const [checked, setChecked] = useState<boolean>(false);

  const sendCheck = useCallback(
    async (checked: boolean) => {
      await sendData?.({
        page,
        element: 1,
        changed: 0,
        value: 0,
      });
      await sendData?.({
        page,
        element: 1,
        changed: 1,
        value: checked ? 1 : 0,
      });
    },
    [sendData]
  );

  const handleCheckedChanged = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
    sendCheck(event.target.checked);
  };

  return (
    <div>
      <CardHeader title="Options" />
      <FormControlLabel
        control={<Checkbox value={checked} onChange={handleCheckedChanged} />}
        label="Connect to Scales"
      />
    </div>
  );
}
