export const typedNavigator = navigator as Navigator & { bluetooth: any };

export const bytesToReceiveLength = 14;

export const startByteOne = 255;
export const startByteTwo = 253;

export const endByteOne = 199;
export const endByteTwo = 200;

export const deviceVersion = 0;

export const defaultDataBuffer = [
  255, 253, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 199, 200,
];

export const commandDivider = "-----------------------------------------------";
