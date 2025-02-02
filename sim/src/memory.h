#ifndef MEMORY_H
#define MEMORY_H

#include <stdint.h>

typedef struct {
    uint32_t data[4096];
    uint64_t instructions[4096];
} Memory;

void memory_init(Memory* mem);
uint32_t memory_read(Memory* mem, uint32_t addr);
void memory_write(Memory* mem, uint32_t addr, uint32_t data);

#endif
