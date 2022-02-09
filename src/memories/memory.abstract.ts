import { createMemory, toHex } from '../util';

export default abstract class Memory {
  protected readonly memory: DataView;
  protected readonly hexPad: number;

  constructor(sizeInBytes: number, hexPad: number) {
    this.memory = createMemory(sizeInBytes);
    this.hexPad = hexPad;
  }

  abstract read(address: number): number;

  abstract write(address: number, data: number): void;

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
