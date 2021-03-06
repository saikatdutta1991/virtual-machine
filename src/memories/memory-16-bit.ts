import { createMemory, toHex } from '../util';

export default class Memory16Bit {
  protected readonly memory: DataView;
  protected readonly hexPad: number = 4;

  constructor() {
    this.memory = createMemory(2);
  }

  public read16(): number {
    return this.memory.getUint16(0);
  }

  public write16(data: number): void {
    this.memory.setUint16(0, data);
  }

  public toString(): string {
    return toHex(this.read16(), this.hexPad);
  }
}
