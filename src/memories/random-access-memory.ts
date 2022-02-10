import { createMemory, toHex } from '../util';

export default class RandomAccessMemory {
  protected readonly memory: DataView;

  constructor(sizeInBytes: number) {
    this.memory = createMemory(sizeInBytes);
  }

  public read8(address: number): number {
    return this.memory.getUint8(address);
  }

  public read16(address: number): number {
    return this.memory.getUint16(address);
  }

  public write8(address: number, data: number): void {
    this.memory.setUint8(address, data);
  }

  public write16(address: number, data: number): void {
    this.memory.setUint16(address, data);
  }

  public toString(): string {
    const segmentLength: number = 16;
    const segmentHalf = segmentLength / 2;

    let output = '';
    for (let i = 0; i < this.memory.byteLength; ) {
      output += `${toHex(i, 4)}:`;
      for (let j = 0; j < segmentLength; j++) {
        if (j === segmentHalf) {
          output += ' ';
        }
        if (i < this.memory.byteLength) {
          output += ` ${toHex(this.read8(i++), 2)}`;
        }
      }
      output += `\n`;
    }

    return output.replace(/\n$/, '');
  }
}
