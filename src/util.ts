export const toHex = (num: number, pad: number = 2) =>
  Number(num).toString(16).padStart(pad, '0');

export const createMemory = (sizeInBytes: number) => {
  const arrayBuffer = new ArrayBuffer(sizeInBytes);
  return new DataView(arrayBuffer);
};
