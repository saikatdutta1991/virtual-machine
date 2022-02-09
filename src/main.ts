import CentralProcessingUnit from './central-processing-unit';
import { InstructionCode } from './enums/instruction-code';
import { RegisterIdentifier } from './enums/registers-identifier';
import RandomAccessMemory from './memories/random-access-memory';

const ram = new RandomAccessMemory(64);
ram.write(0x00, InstructionCode.MOV);
ram.write(0x01, 0x12);
ram.write(0x02, 0x34);
ram.write(0x03, RegisterIdentifier.R1);

ram.write(0x04, InstructionCode.MOV);
ram.write(0x05, 0xab);
ram.write(0x06, 0xcd);
ram.write(0x07, RegisterIdentifier.R2);

const cpu = new CentralProcessingUnit(ram);
cpu.cycle();
cpu.cycle();
cpu.debugRam();
cpu.debugRegisters();
