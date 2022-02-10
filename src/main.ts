import CentralProcessingUnit from './central-processing-unit';
import { Instructions } from './enums/instructions';
import { Register } from './enums/register';
import RandomAccessMemory from './memories/random-access-memory';

const ram = new RandomAccessMemory(64);
ram.write8(0x0000, Instructions.MOV_LIT_REG);
ram.write8(0x0001, 0x00);
ram.write8(0x0002, 0x01);
ram.write8(0x0003, Register.R1);

ram.write8(0x0004, Instructions.MOV_LIT_REG);
ram.write8(0x0005, 0x00);
ram.write8(0x0006, 0x01);
ram.write8(0x0007, Register.R2);

ram.write8(0x0008, Instructions.ADD_REG_REG);
ram.write8(0x0009, Register.R1);
ram.write8(0x000a, Register.R2);

const cpu = new CentralProcessingUnit(ram);
cpu.cycle();
cpu.cycle();
cpu.cycle();
cpu.debugRam();
cpu.debugRegisters();
