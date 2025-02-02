#ifndef MEMORY_H
#define MEMORY_H

#include <stdint.h>

typedef struct {
    uint32_t data[4096];         // 32-bit data memory
    uint64_t instructions[4096];  // 48-bit instruction memory (stored in 64-bit)
} Memory;

void memory_init(Memory* mem);
uint32_t memory_read(Memory* mem, uint32_t addr);
void memory_write(Memory* mem, uint32_t addr, uint32_t data);
uint64_t memory_read_instruction(Memory* mem, uint32_t addr);
void memory_write_instruction(Memory* mem, uint32_t addr, uint64_t instruction);

#endif
