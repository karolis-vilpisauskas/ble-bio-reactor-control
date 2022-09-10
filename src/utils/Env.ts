import { GattIdentifiers } from "../types/Env";

export const useGattIdentifiers = (): GattIdentifiers => {
  return {
    deviceId: process?.env?.REACT_APP_DEVICE_ID ?? "",
    serviceId: process?.env?.REACT_APP_SERVICE_ID ?? "",
    characteristicRxId: process?.env?.REACT_APP_CHARACTERISTIC_RX_ID ?? "",
    characteristicTxId: process?.env?.REACT_APP_CHARACTERISTIC_TX_ID ?? "",
    descriptorId: process?.env?.REACT_APP_DESCRIPTOR_ID ?? "",
  };
};
