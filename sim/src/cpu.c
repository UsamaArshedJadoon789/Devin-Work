#include "cpu.h"
#include "memory.h"
#include "io.h"
#include "interrupt.h"

void cpu_init(CPU* cpu) {
    for (int i = 0; i < 16; i++) {
        cpu->registers[i] = 0;
    }
    cpu->pc = 0;
    cpu->instruction = 0;
    cpu->cycles = 0;
    cpu->halted = false;
    cpu->in_isr = false;
}

void cpu_execute(CPU* cpu, Memory* mem, IO* io) {
    if (cpu->halted) return;
    check_interrupts(cpu, io);
    cpu->instruction = mem->instructions[cpu->pc];
    cpu->cycles++;
    io_update(io);
}
