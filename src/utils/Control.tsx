import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ControlContext, ControlEnum } from "../types/Control";

export const controlContext = createContext<ControlContext>({});

export const useControl = () => {
  const [selectedControl, setSelectedControl] = useState<
    ControlEnum | undefined
  >(undefined);

  const handleChangeControl = useCallback(
    (chosenControl: ControlEnum) => () => {
      setSelectedControl(chosenControl);
    },
    []
  );

  return {
    selectedControl,
    handleChangeControl,
  };
};

export const ControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useControl();

  return (
    <controlContext.Provider value={value}>{children}</controlContext.Provider>
  );
};

export const useControlContext = () => {
  return useContext(controlContext);
};
