#ifndef IO_H
#define IO_H

#include <stdint.h>
#include <stdbool.h>

typedef struct {
    uint32_t registers[23];      // I/O registers
    uint8_t disk[128][512];      // Disk sectors (128 sectors * 512 bytes)
    uint8_t monitor[256][256];   // Monitor pixels (256x256 grayscale)
    uint32_t leds;               // LED state
    uint32_t display7seg;        // 7-segment display value
    uint32_t disk_timer;         // Disk operation timer
    uint32_t cycles;             // Clock cycles counter
    bool disk_busy;              // Disk busy flag
} IO;

void io_init(IO* io);
uint32_t io_read(IO* io, uint32_t reg);
void io_write(IO* io, uint32_t reg, uint32_t data);
void io_update(IO* io);

#endif
