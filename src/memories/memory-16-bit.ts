import Memory from './memory.abstract';

export default class Memory16Bit extends Memory {
  private static readonly SIZE_IN_BYTES = 2;
  private static readonly START_OFFSET = 0;
  private static HEX_PAD = 4;

  constructor() {
    super(Memory16Bit.SIZE_IN_BYTES, Memory16Bit.HEX_PAD);
  }

  public read(): number {
    return this.memory.getUint16(Memory16Bit.START_OFFSET);
  }

  public write(data: number): void {
    this.memory.setUint16(Memory16Bit.START_OFFSET, data);
  }

  public toString(): string {
    return super.toString().replace('0000:', '');
  }
}
