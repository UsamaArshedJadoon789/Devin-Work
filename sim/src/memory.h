#ifndef MEMORY_H
#define MEMORY_H

#include <stdint.h>

/**
 * Memory system structure containing both instruction and data memory
 * Implements Harvard architecture with separate instruction and data spaces
 */
typedef struct {
    uint32_t data[4096];         /* 32-bit data memory (4K words) */
    uint64_t instructions[4096];  /* 48-bit instruction memory (4K lines) */
} Memory;

/**
 * Initializes memory system to zero state
 * @param mem Pointer to memory structure
 */
void memory_init(Memory* mem);

/**
 * Reads 32-bit word from data memory
 * @param mem Pointer to memory structure
 * @param addr Memory address (0-4095)
 * @return Data word at specified address
 */
uint32_t memory_read(Memory* mem, uint32_t addr);

/**
 * Writes 32-bit word to data memory
 * @param mem Pointer to memory structure
 * @param addr Memory address (0-4095)
 * @param data Word to write
 */
void memory_write(Memory* mem, uint32_t addr, uint32_t data);

/**
 * Reads 48-bit instruction from instruction memory
 * @param mem Pointer to memory structure
 * @param addr Instruction address (0-4095)
 * @return Instruction at specified address
 */
uint64_t memory_read_instruction(Memory* mem, uint32_t addr);

/**
 * Writes 48-bit instruction to instruction memory
 * @param mem Pointer to memory structure
 * @param addr Instruction address (0-4095)
 * @param instruction Instruction to write
 */
void memory_write_instruction(Memory* mem, uint32_t addr, uint64_t instruction);

#endif
