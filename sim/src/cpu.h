#ifndef CPU_H
#define CPU_H

#include <stdint.h>
#include <stdbool.h>
#include "memory.h"
#include "io.h"

/**
 * CPU state structure representing the SIMP processor
 * Contains general-purpose registers, program counter, and status flags
 */
typedef struct {
    uint32_t registers[16];    /* General purpose registers (R0-R15) */
    uint32_t pc;              /* Program counter */
    uint64_t instruction;     /* Current instruction (48-bit) */
    uint32_t cycles;          /* Clock cycle counter */
    bool halted;             /* Processor halt status */
    bool in_isr;            /* Interrupt service routine status */
} CPU;

/**
 * Initializes CPU state to default values
 * @param cpu Pointer to CPU structure to initialize
 */
void cpu_init(CPU* cpu);

/**
 * Executes one instruction cycle including fetch, decode, execute
 * @param cpu Pointer to CPU structure
 * @param mem Pointer to memory system
 * @param io Pointer to I/O system
 */
void cpu_execute(CPU* cpu, Memory* mem, IO* io);

/**
 * Processes pending interrupts according to priority
 * @param cpu Pointer to CPU structure
 * @param io Pointer to I/O system for interrupt status
 */
void cpu_handle_interrupts(CPU* cpu, IO* io);

#endif
