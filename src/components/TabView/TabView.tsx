import { Box } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabView({ children, value, index, ...other }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}-${value}`}
      aria-labelledby={`tab-${index}-${value}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
