import { Dispatch, SetStateAction } from "react";

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

export interface SendDataParams {
  page: number;
  element: number;
  changed: number;
  value: number;
}

export interface BluetoothContext {
  getBleDevice?: () => Promise<void>;
  device?: any;
  loading?: boolean;
  isConnected?: boolean;
  deviceName?: string;
  deviceId?: number;
  sendData?: (params: SendDataParams) => Promise<unknown>;
  commands?: string[];
  page?: number;
  element?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  value?: number;
  isBluetoothAvailable?: boolean;
}
