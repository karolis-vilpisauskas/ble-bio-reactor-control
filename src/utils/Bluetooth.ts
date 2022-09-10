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
  const [characteristic, setCharacteristic] = useState<any>(null);

  const isConnected = useMemo(() => server?.connected, [server?.connected]);

  const deviceName = useMemo(() => device?.name, [device?.name]);

  const deviceId = useMemo(() => device?.id, [device?.id]);

  const receiveData = useCallback((event: any) => {
    console.log(event);
  }, []);

  const getBleDevice = useCallback(async () => {
    startLoading();
    const device = await typedNavigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: [serviceId],
      })
      .catch(() => {
        stopLoading();
      });

    if (!!device) {
      setDevice(device);
      const server = await device.gatt?.connect();
      setServer(server);
      if (!!server) {
        const service = await server?.getPrimaryService(serviceId);
        setService(service);
        if (!!service) {
          const characteristic = await service?.getCharacteristic(
            characteristicRxId
          );
          //   await characteristic?.startNotifications();
          //   await characteristic?.addEventListener(
          //     "characteristicvaluechanged",
          //     handleTx
          //   );
          setCharacteristic(characteristic);
        }
      }
    }
    stopLoading();
  }, [characteristicRxId, serviceId, startLoading, stopLoading]);

  const sendData = useCallback(
    async (data: string) => {
      startLoading();
      return new Promise((resolve, reject) => {
        characteristic
          ?.writeValue(new TextEncoder().encode(data))
          .then(resolve)
          .catch(reject)
          .finally(() => stopLoading());
      });
    },
    [characteristic, startLoading, stopLoading]
  );

  return {
    getBleDevice,
    device,
    loading,
    isConnected,
    deviceName,
    deviceId,
    sendData,
  };
};
