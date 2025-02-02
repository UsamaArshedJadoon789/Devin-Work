#include "memory.h"
#include <string.h>
#include <stdint.h>

void memory_init(Memory* mem) {
    memset(mem->data, 0, sizeof(mem->data));
    memset(mem->instructions, 0, sizeof(mem->instructions));
}

uint32_t memory_read(Memory* mem, uint32_t addr) {
    if (addr >= 4096) {
        return 0;
    }
    return mem->data[addr];
}

void memory_write(Memory* mem, uint32_t addr, uint32_t data) {
    if (addr >= 4096) {
        return;
    }
    mem->data[addr] = data;
}

uint64_t memory_read_instruction(Memory* mem, uint32_t addr) {
    if (addr >= 4096) {
        return 0;
    }
    return mem->instructions[addr];
}

void memory_write_instruction(Memory* mem, uint32_t addr, uint64_t instruction) {
    if (addr >= 4096) {
        return;
    }
    mem->instructions[addr] = instruction;
}
