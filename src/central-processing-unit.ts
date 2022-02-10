import { Instructions } from './enums/instructions';
import { Register } from './enums/register';
import Memory16Bit from './memories/memory-16-bit';
import RandomAccessMemory from './memories/random-access-memory';
import { toHex } from './util';

export default class CentralProcessingUnit {
  private ram: RandomAccessMemory;

  private registers: { [identity in Register]: Memory16Bit };

  constructor(ram: RandomAccessMemory) {
    this.ram = ram;

    this.registers = {
      [Register.IP]: new Memory16Bit(),
      [Register.ACC]: new Memory16Bit(),
      [Register.R1]: new Memory16Bit(),
      [Register.R2]: new Memory16Bit(),
      [Register.R3]: new Memory16Bit(),
      [Register.R4]: new Memory16Bit(),
      [Register.R5]: new Memory16Bit(),
      [Register.R6]: new Memory16Bit(),
      [Register.R7]: new Memory16Bit(),
      [Register.R8]: new Memory16Bit(),
    };
  }

  public cycle() {
    const opcode = this.fetch8();

    switch (opcode) {
      case Instructions.MOV_LIT_REG: {
        const value = this.fetch16();
        const register = this.fetch8();
        this.setRegister(register, value);
        return;
      }

      case Instructions.MOV_REG_REG: {
        const r1 = this.fetch8(),
          r2 = this.fetch8();
        this.setRegister(r2, this.getRegister(r1));
        return;
      }

      case Instructions.MOV_REG_MEM: {
        const registerValue = this.getRegister(this.fetch8());
        const memAddress = this.fetch16();
        this.write16(memAddress, registerValue);
        return;
      }

      case Instructions.MOV_MEM_REG: {
        const value = this.fetch16();
        const register = this.fetch8();
        this.setRegister(register, value);
        return;
      }

      case Instructions.ADD_REG_REG: {
        const r1 = this.fetch8();
        const r2 = this.fetch8();
        const sum = this.getRegister(r1) + this.getRegister(r2);
        this.setRegister(Register.ACC, sum);

        return;
      }

      default:
        throw new Error(`Invalid instructio code: ${toHex(opcode)}`);
    }
  }

  private fetch8(): number {
    const address = this.getRegister(Register.IP);
    const data = this.ram.read8(address);
    this.setRegister(Register.IP, address + 1);
    return data;
  }

  private fetch16(): number {
    const address = this.getRegister(Register.IP);
    const data = this.ram.read16(address);
    this.setRegister(Register.IP, address + 2);
    return data;
  }

  private write16(address: number, data: number): void {
    this.ram.write16(address, data);
  }

  private getRegister(ri: Register): number {
    return this.registers[ri].read16();
  }

  private setRegister(ri: Register, value: number): void {
    return this.registers[ri].write16(value);
  }

  public debug() {
    this.debugRam();
    this.debugRegisters();
  }

  public debugRam() {
    console.log(`
RAM
---
${this.ram.toString()}
`);
  }

  public debugRegisters() {
    console.log(`
Registers
---------
 PC:  ${this.registers[0].toString()}
ACC:  ${this.registers[1].toString()}
 R1:  ${this.registers[2].toString()}
 R2:  ${this.registers[3].toString()}
 R3:  ${this.registers[4].toString()}
 R4:  ${this.registers[5].toString()}
 R5:  ${this.registers[6].toString()}
 R6:  ${this.registers[7].toString()}
 R7:  ${this.registers[8].toString()}
 R8:  ${this.registers[9].toString()}
    `);
  }
}
