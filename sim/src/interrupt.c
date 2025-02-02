#include "interrupt.h"

void check_interrupts(CPU* cpu, IO* io) {
    if (cpu->in_isr) return;
    
    if (io_read(io, 3) && io_read(io, 0)) {
        handle_timer_interrupt(cpu, io);
    } else if (io_read(io, 4) && io_read(io, 1)) {
        handle_disk_interrupt(cpu, io);
    } else if (io_read(io, 5) && io_read(io, 2)) {
        handle_external_interrupt(cpu, io);
    }
}

void handle_timer_interrupt(CPU* cpu, IO* io) {
    cpu->in_isr = true;
    io_write(io, 3, 0);
}

void handle_disk_interrupt(CPU* cpu, IO* io) {
    cpu->in_isr = true;
    io_write(io, 4, 0);
}

void handle_external_interrupt(CPU* cpu, IO* io) {
    cpu->in_isr = true;
    io_write(io, 5, 0);
}
