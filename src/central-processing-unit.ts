import { RAM_FIRST_ADDRESS } from './constants';
import { InstructionCode } from './enums/instruction-code';
import { RegisterIdentifier } from './enums/registers-identifier';
import Memory16Bit from './memories/memory-16-bit';
import RandomAccessMemory from './memories/random-access-memory';
import { toHex } from './util';

export default class CentralProcessingUnit {
  private ram: RandomAccessMemory;

  private registers: { [identity in RegisterIdentifier]: Memory16Bit };

  constructor(ram: RandomAccessMemory) {
    this.ram = ram;

    this.registers = {
      [RegisterIdentifier.PC]: new Memory16Bit(),
      [RegisterIdentifier.ACC]: new Memory16Bit(),
      [RegisterIdentifier.R1]: new Memory16Bit(),
      [RegisterIdentifier.R2]: new Memory16Bit(),
      [RegisterIdentifier.R3]: new Memory16Bit(),
      [RegisterIdentifier.R4]: new Memory16Bit(),
      [RegisterIdentifier.R5]: new Memory16Bit(),
      [RegisterIdentifier.R6]: new Memory16Bit(),
      [RegisterIdentifier.R7]: new Memory16Bit(),
      [RegisterIdentifier.R8]: new Memory16Bit(),
    };

    this.resetProgramCounter();
  }

  public resetProgramCounter() {
    this.registers[RegisterIdentifier.PC].write(RAM_FIRST_ADDRESS);
  }

  public cycle() {
    const instructioncode = this.fetchInstructionCode();

    switch (instructioncode) {
      case InstructionCode.MOV:
        const data = this.ram.read2Bytes(this.getNextAddress());
        this.setNextAddress(2);
        const register = this.getRegister(this.ram.read(this.getNextAddress()));
        this.setNextAddress();
        register.write(data);

        break;

      default:
        throw new Error(`Invalid instructio code: ${toHex(instructioncode)}`);
    }
  }

  private fetchInstructionCode(): InstructionCode {
    const nextAddress = this.getNextAddress();
    const instructioncode = this.ram.read(nextAddress);
    this.setNextAddress();
    return instructioncode;
  }

  private getNextAddress(): number {
    const register = this.getRegister(RegisterIdentifier.PC);
    return register.read();
  }

  private setNextAddress(byBytes: number = 1): void {
    const register = this.getRegister(RegisterIdentifier.PC);
    register.write(register.read() + byBytes);
  }

  private getRegister(ri: RegisterIdentifier): Memory16Bit {
    return this.registers[ri];
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
