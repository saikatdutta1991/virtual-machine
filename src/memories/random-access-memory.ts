import Memory from './memory.abstract';

export default class RandomAccessMemory extends Memory {
  private static HEX_PAD = 2;

  constructor(sizeInBytes: number) {
    super(sizeInBytes, RandomAccessMemory.HEX_PAD);
  }

  public read(address: number): number {
    return this.memory.getUint8(address);
  }

  public write(address: number, data: number): void {
    this.memory.setUint8(address, data);
  }
}
