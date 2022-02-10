import CentralProcessingUnit from './central-processing-unit';
import { Instructions } from './enums/instructions';
import { RegisterIdentifier } from './enums/registers-identifier';
import RandomAccessMemory from './memories/random-access-memory';

const ram = new RandomAccessMemory(64);
ram.write8(0x0000, Instructions.MOV_LIT_REG);
ram.write8(0x0001, 0x12);
ram.write8(0x0002, 0x34);
ram.write8(0x0003, RegisterIdentifier.R1);

ram.write8(0x0004, Instructions.MOV_REG_MEM);
ram.write8(0x0005, RegisterIdentifier.R1);
ram.write8(0x0006, 0x00);
ram.write8(0x0007, 0x10);

// ram.write8(0x04, Instructions.MOV_LIT_REG);
// ram.write8(0x05, 0xab);
// ram.write8(0x06, 0xcd);
// ram.write8(0x07, RegisterIdentifier.R2);

// ram.write8(0x08, Instructions.MOV_REG_REG);
// ram.write8(0x09, RegisterIdentifier.R1);
// ram.write8(0x0a, RegisterIdentifier.R2);

const cpu = new CentralProcessingUnit(ram);
cpu.cycle();
cpu.cycle();
// cpu.cycle();
cpu.debugRam();
cpu.debugRegisters();
