import * as ReadLine from 'readline';
import CentralProcessingUnit from './central-processing-unit';
import { Instructions } from './enums/instructions';
import { Register } from './enums/register';
import RandomAccessMemory from './memories/random-access-memory';

const ram = new RandomAccessMemory(64);
ram.write8(0x0000, Instructions.MOV_LIT_REG);
ram.write16(0x0001, 0x0001);
ram.write8(0x0003, Register.R1);

ram.write8(0x0004, Instructions.MOV_LIT_REG);
ram.write16(0x0005, 0x0000);
ram.write8(0x0007, Register.R2);

ram.write8(0x0008, Instructions.ADD_REG_REG);
ram.write8(0x0009, Register.R1);
ram.write8(0x000a, Register.R2);

ram.write8(0x000b, Instructions.MOV_REG_REG);
ram.write8(0x000c, Register.ACC);
ram.write8(0x000d, Register.R2);

ram.write8(0x000e, Instructions.JNE_LIT_MEM);
ram.write16(0x000f, 0x0003);
ram.write16(0x0011, 0x0008);

const cpu = new CentralProcessingUnit(ram);
cpu.debugRam();
cpu.debugRegisters();

const readline = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let cycleCount = 0;
readline.on('line', () => {
  console.log(`Cycle start ----${cycleCount++}`);
  cpu.cycle();
  cpu.debugRam();
  cpu.debugRegisters();
});

//     mov 1 r1
//     mov 0 r2
// label:
//     add r1(1) r2(3) --> acc  3
//     mov acc r2
//     jump if acc != 3 to label
