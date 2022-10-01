import { useCallback, useMemo, useState } from "react";
import { BluetoothIndexes } from "../types/Bluetooth";
import { useGattIdentifiers } from "./Env";
import { useLoading } from "./Loading";

// const interval = 10000;

const byteLength = 14;

const startByteOne = 255;
const startByteTwo = 253;

const version = 0;

const endByteOne = 199;
const endByteTwo = 200;

export const defaultDataBuffer = [
  255, 253, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 199, 200,
];

export const generateCrc16 = (bytes: Uint8Array, length: number): number => {
  let crc = 0xffff;
  const poly = 0x8408;
  if (bytes.byteLength === 0) return crc;

  for (let i = 0; i < length; i++) {
    for (let j = 0, data = 0xff & bytes[i]; j < 8; j++, data >>= 1) {
      if (((crc & 0x0001) ^ (data & 0x0001)) !== 0) crc = (crc >> 1) ^ poly;
      else crc >>= 1;
    }
  }

  return crc;
};

const typedNavigator = navigator as Navigator & { bluetooth: any };

export const useBluetooth = () => {
  const { serviceId, characteristicRxId, characteristicTxId } =
    useGattIdentifiers();
  const { loading, startLoading, stopLoading } = useLoading();

  // BLE
  const [device, setDevice] = useState<any>(null);
  const [server, setServer] = useState<any>(null);
  const [, setService] = useState<any>(null);
  const [, setTxCharacteristic] = useState<any>(null);
  const [rxCharacteristic, setRxCharacteristic] = useState<any>(null);
  const [commands, setCommands] = useState<string[]>([]);

  // Values
  const [page, setPage] = useState<number>(0);
  const [element, setElement] = useState<number>(0);
  // const [value, setValue] = useState<number>(0);

  const isConnected = useMemo(() => server?.connected, [server?.connected]);

  const deviceName = useMemo(() => device?.name, [device?.name]);

  const deviceId = useMemo(() => device?.id, [device?.id]);

  const addCommand = useCallback(
    (command: string) => setCommands((prevValue) => [...prevValue, command]),
    []
  );

  const receiveData = useCallback((event: any) => {
    const receivedValue = event.target.value as DataView;
    const buffer = receivedValue.buffer;
    const uint8Array = new Uint8Array(buffer);

    const hasCorrectLength = buffer.byteLength === byteLength;

    const hasStartBytes =
      uint8Array[BluetoothIndexes.StartOne] === startByteOne &&
      uint8Array[BluetoothIndexes.StartTwo] === startByteTwo;

    const hasEndBytes =
      uint8Array[BluetoothIndexes.EndOne] === endByteOne &&
      uint8Array[BluetoothIndexes.EndTwo] === endByteTwo;

    if (hasCorrectLength && hasStartBytes && hasEndBytes) {
      setPage(uint8Array[BluetoothIndexes.Page]);
      setElement(uint8Array[BluetoothIndexes.Element]);
    }
  }, []);

  const getBleDevice = useCallback(async () => {
    startLoading();
    addCommand("Requesting device...");
    const device = await typedNavigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: [serviceId],
      })
      .catch(() => {
        addCommand("Connection canceled");
        addCommand("-------------------------------");
        stopLoading();
      });

    if (!!device) {
      addCommand("Device Found");
      setDevice(device);
      addCommand("Connecting...");
      const server = await device.gatt?.connect();
      setServer(server);
      if (!!server) {
        addCommand("Connected successfully");
        addCommand("Getting service...");
        const service = await server?.getPrimaryService(serviceId);
        setService(service);
        if (!!service) {
          addCommand("Service received successfully");
          addCommand("Setting RX characteristic...");
          const rxCharacteristic = await service?.getCharacteristic(
            characteristicRxId
          );
          setRxCharacteristic(rxCharacteristic);
          rxCharacteristic.writeValue(new ArrayBuffer(8));
          addCommand("RX characteristic set");

          addCommand("Setting TX characteristic...");
          const txCharacteristic = await service?.getCharacteristic(
            characteristicTxId
          );
          addCommand("Starting notifications...");
          await txCharacteristic?.startNotifications();
          addCommand("Adding command watcher...");
          await txCharacteristic?.addEventListener(
            "characteristicvaluechanged",
            receiveData
          );
          setTxCharacteristic(txCharacteristic);
          addCommand("TX characteristic set");
          addCommand("Connection successful!");
          addCommand("Waiting for commands...");
          addCommand("-------------------------------");
        }
      }
    }
    stopLoading();
  }, [
    addCommand,
    characteristicRxId,
    characteristicTxId,
    receiveData,
    serviceId,
    startLoading,
    stopLoading,
  ]);

  const sendData = useCallback(
    async (data: number[]) => {
      startLoading();
      const buffer = new ArrayBuffer(byteLength);
      const uintArray = new Uint8Array(buffer);

      // Setup start bytes
      uintArray[BluetoothIndexes.StartOne] = startByteOne;
      uintArray[BluetoothIndexes.StartTwo] = startByteTwo;

      // Setup all values of int8 array
      uintArray[BluetoothIndexes.Version] = version;
      uintArray[BluetoothIndexes.Page] = data[BluetoothIndexes.Page];
      uintArray[BluetoothIndexes.Element] = data[BluetoothIndexes.Element];
      uintArray[BluetoothIndexes.Changed] = data[BluetoothIndexes.Changed];
      uintArray[BluetoothIndexes.ValueOne] = data[BluetoothIndexes.ValueOne];
      uintArray[BluetoothIndexes.ValueTwo] = data[BluetoothIndexes.ValueTwo];
      uintArray[BluetoothIndexes.ValueThree] =
        data[BluetoothIndexes.ValueThree];
      uintArray[BluetoothIndexes.ValueFour] = data[BluetoothIndexes.ValueFour];

      uintArray[BluetoothIndexes.EndOne] = endByteOne;
      uintArray[BluetoothIndexes.EndTwo] = endByteTwo;

      const crc = generateCrc16(uintArray, byteLength - 4);
      uintArray[BluetoothIndexes.CrcOne] = crc;
      uintArray[BluetoothIndexes.CrcTwo] = crc >> 8;

      return new Promise((resolve, reject) => {
        rxCharacteristic
          ?.writeValue(uintArray)
          .then(resolve)
          .catch(reject)
          .finally(() => stopLoading());
      });
    },
    [rxCharacteristic, startLoading, stopLoading]
  );

  return {
    getBleDevice,
    device,
    loading,
    isConnected,
    deviceName,
    deviceId,
    sendData,
    commands,
    page,
    element,
  };
};
