#ifndef CPU_H
#define CPU_H

#include <stdint.h>
#include <stdbool.h>
#include "memory.h"
#include "io.h"

typedef struct {
    uint32_t registers[16];
    uint32_t pc;
    uint64_t instruction;
    uint32_t cycles;
    bool halted;
    bool in_isr;
} CPU;

void cpu_init(CPU* cpu);
void cpu_execute(CPU* cpu, Memory* mem, IO* io);
void cpu_handle_interrupts(CPU* cpu, IO* io);

#endif
