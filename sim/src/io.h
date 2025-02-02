#ifndef IO_H
#define IO_H

#include <stdint.h>
#include <stdbool.h>

/**
 * I/O system structure managing all peripheral devices
 * Handles disk, monitor, LEDs, 7-segment display, and interrupt sources
 */
typedef struct {
    uint32_t registers[23];      /* I/O control registers (IRQ enables, status) */
    uint8_t disk[128][512];      /* Disk storage (128 sectors × 512 bytes) */
    uint8_t monitor[256][256];   /* Display buffer (256×256 grayscale) */
    uint32_t leds;               /* LED output register */
    uint32_t display7seg;        /* 7-segment display register */
    uint32_t disk_timer;         /* Disk operation countdown */
    uint32_t cycles;             /* System clock counter */
    bool disk_busy;              /* Disk operation status */
} IO;

/**
 * Initializes I/O system to default state
 * @param io Pointer to I/O structure
 */
void io_init(IO* io);

/**
 * Reads value from I/O register
 * @param io Pointer to I/O structure
 * @param reg Register number (0-22)
 * @return Value from specified register
 */
uint32_t io_read(IO* io, uint32_t reg);

/**
 * Writes value to I/O register
 * @param io Pointer to I/O structure
 * @param reg Register number (0-22)
 * @param data Value to write
 */
void io_write(IO* io, uint32_t reg, uint32_t data);

/**
 * Updates I/O system state each clock cycle
 * @param io Pointer to I/O structure
 */
void io_update(IO* io);

#endif
