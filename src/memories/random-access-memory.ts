import { createMemory, toHex } from '../util';

export default class RandomAccessMemory {
  protected readonly memory: DataView;
  protected readonly hexPad: number = 2;

  constructor(sizeInBytes: number) {
    this.memory = createMemory(sizeInBytes);
  }

  public read(address: number): number {
    return this.memory.getUint8(address);
  }

  public write(address: number, data: number): void {
    this.memory.setUint8(address, data);
  }

  public toString(): string {
    const segmentLength: number = 16;
    const segmentHalf = segmentLength / 2;

    let output = '';
    for (let i = 0; i < this.memory.byteLength; ) {
      output += `${toHex(i, this.hexPad)}:`;
      for (let j = 0; j < segmentLength; j++) {
        if (j === segmentHalf) {
          output += ' ';
        }
        if (i < this.memory.byteLength) {
          output += ` ${toHex(this.read(i++), this.hexPad)}`;
        }
      }
      output += `\n`;
    }

    return output.replace(/\n$/, '');
  }
}
