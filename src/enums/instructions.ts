export enum Instructions {
  MOV_LIT_REG = 0x10,
  MOV_REG_REG = 0x11,
  MOV_REG_MEM = 0x12,
  MOV_MEM_REG = 0x13,

  ADD_REG_REG = 0x14, // Add registers and save in ACC

  JNE_LIT_MEM = 0x15, // Jump to mem address if literal not equals to ACC
}
