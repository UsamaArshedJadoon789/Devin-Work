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
    io->cycles = 0;
}

uint32_t io_read(IO* io, uint32_t reg) {
    if (reg >= 23) return 0;
    
    switch (reg) {
        case 8:  // clks
            return io->cycles;
        case 9:  // leds
            return io->leds;
        case 10: // display7seg
            return io->display7seg;
        case 14: // disk status
            return io->disk_busy ? 1 : 0;
        default:
            return io->registers[reg];
    }
}

void io_write(IO* io, uint32_t reg, uint32_t data) {
    if (reg >= 23) return;
    
    switch (reg) {
        case 9:  // leds
            io->leds = data;
            break;
        case 10: // display7seg
            io->display7seg = data;
            break;
        case 11: // monitor cmd
            if (data == 1) {
                uint32_t addr = io->registers[12];
                uint32_t pixel = io->registers[13];
                if (addr < 65536) {
                    io->monitor[addr / 256][addr % 256] = pixel & 0xFF;
                }
            }
            break;
        case 14: // disk cmd
            if (!io->disk_busy && data == 1) {
                uint32_t sector = io->registers[15] & 0x7F;
                uint32_t buffer_addr = io->registers[16] & 0xFFF;
                if (io->registers[17] == 1) {  // Write
                    for (int i = 0; i < 128; i++) {
                        io->disk[sector][i] = io->registers[buffer_addr + i];
                    }
                } else {  // Read
                    for (int i = 0; i < 128; i++) {
                        io->registers[buffer_addr + i] = io->disk[sector][i];
                    }
                }
                io->disk_busy = true;
                io->disk_timer = 1024;
            }
            break;
        default:
            io->registers[reg] = data;
            break;
    }
}

void io_update(IO* io) {
    io->cycles++;
    
    if (io->disk_busy && --io->disk_timer == 0) {
        io->disk_busy = false;
        if (io->registers[1]) {  // IRQ1 enabled
            io->registers[4] = 1;  // Set disk interrupt
        }
    }
    
    if (io->registers[0] && io->registers[21] == io->registers[22]) {  // Timer interrupt
        io->registers[3] = 1;
        io->registers[21] = 0;
    } else if (io->registers[21] < io->registers[22]) {
        io->registers[21]++;
    }
}
