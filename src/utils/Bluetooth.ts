import { useCallback, useMemo, useState } from "react";
import { useGattIdentifiers } from "./Env";
import { useLoading } from "./Loading";

const typedNavigator = navigator as Navigator & { bluetooth: any };

export const useBluetooth = () => {
  const { serviceId, characteristicRxId, characteristicTxId } =
    useGattIdentifiers();
  const { loading, startLoading, stopLoading } = useLoading();

  const [device, setDevice] = useState<any>(null);
  const [server, setServer] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [txCharacteristic, setTxCharacteristic] = useState<any>(null);
  const [rxCharacteristic, setRxCharacteristic] = useState<any>(null);
  const [commands, setCommands] = useState<string[]>([]);
  const [receiveBuffer, setReceiveBuffer] = useState<number[]>([]);

  const isConnected = useMemo(() => server?.connected, [server?.connected]);

  const deviceName = useMemo(() => device?.name, [device?.name]);

  const deviceId = useMemo(() => device?.id, [device?.id]);

  const addCommand = useCallback(
    (command: string) => setCommands((prevValue) => [...prevValue, command]),
    []
  );

  const receiveData = useCallback((event: any) => {
    const receivedValue = event.target.value as DataView;
    const int8 = receivedValue.getUint8(0);
    if (typeof int8 === "number") {
      setReceiveBuffer((prevBuffer) => {
        const newBuffer = [...prevBuffer, int8];
        if (newBuffer.length === 7) {
          const uint8Array = new Uint8Array(newBuffer);
          console.log(new TextDecoder().decode(uint8Array));
          return [];
        }
        return newBuffer;
      });
    }

    // const value = new TextDecoder().decode(event.target.value);
    // for (const c of value) {
    //   if (c === "\n") {
    //     const data = receiveBuffer.trim();

    //     if (data) {
    //       addCommand(data);
    //     }
    //     setReceiveBuffer("");
    //   } else {
    //     setReceiveBuffer((prevBuffer) => prevBuffer + c);
    //   }
    // }
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
    async (data: string) => {
      startLoading();
      return new Promise((resolve, reject) => {
        rxCharacteristic
          ?.writeValue(new TextEncoder().encode(data))
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
  };
};
