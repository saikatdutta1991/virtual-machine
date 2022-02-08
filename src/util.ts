export const toHex = (num: number) => Number(num).toString(16).padStart(2, '0');

export const createMemory = (sizeInBytes: number) => {
  const arrayBuffer = new ArrayBuffer(sizeInBytes);
  return new DataView(arrayBuffer);
};
