export enum BluetoothIndexes {
  StartOne,
  StartTwo,
  Version,
  Page,
  Element,
  Changed,
  ValueOne,
  ValueTwo,
  ValueThree,
  ValueFour,
  CrcOne,
  CrcTwo,
  EndOne,
  EndTwo,
}

export interface BleValues {
  hasStartBytes: boolean;
  hasEndBytes: boolean;
  hasCorrectLength: boolean;
  version: number;
  page: number;
  element: number;
  value: number;
}
