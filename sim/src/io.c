#include "io.h"
#include <string.h>
#include <stdbool.h>

void io_init(IO* io) {
    memset(io->registers, 0, sizeof(io->registers));
    memset(io->disk, 0, sizeof(io->disk));
    memset(io->monitor, 0, sizeof(io->monitor));
    io->leds = 0;
    io->display7seg = 0;
    io->disk_timer = 0;
    io->disk_busy = false;
}

uint32_t io_read(IO* io, uint32_t reg) {
    if (reg >= 23) return 0;
    return io->registers[reg];
}

void io_write(IO* io, uint32_t reg, uint32_t data) {
    if (reg >= 23) return;
    io->registers[reg] = data;
}

void io_update(IO* io) {
    if (io->disk_busy && --io->disk_timer == 0) {
        io->disk_busy = false;
    }
}
