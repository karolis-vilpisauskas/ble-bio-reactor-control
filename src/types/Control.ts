export enum ControlEnum {
  "Stirrer" = 0,
  "Pump" = 1,
}

export interface ControlContext {
  selectedControl?: ControlEnum;
  handleChangeControl?: (selectedControl: ControlEnum) => () => void;
}
