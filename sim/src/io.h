#ifndef IO_H
#define IO_H

#include <stdint.h>
#include <stdbool.h>

typedef struct {
    uint32_t registers[23];
    uint8_t disk[128][512];
    uint8_t monitor[256][256];
    uint32_t leds;
    uint32_t display7seg;
    uint32_t disk_timer;
    bool disk_busy;
} IO;

void io_init(IO* io);
uint32_t io_read(IO* io, uint32_t reg);
void io_write(IO* io, uint32_t reg, uint32_t data);
void io_update(IO* io);

#endif
