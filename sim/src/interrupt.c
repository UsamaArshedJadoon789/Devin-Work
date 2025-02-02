#include "interrupt.h"

void check_interrupts(CPU* cpu, IO* io) {
    if (cpu->in_isr) return;
    
    uint32_t irq0_enabled = io_read(io, 0);
    uint32_t irq1_enabled = io_read(io, 1);
    uint32_t irq2_enabled = io_read(io, 2);
    uint32_t irq0_status = io_read(io, 3);
    uint32_t irq1_status = io_read(io, 4);
    uint32_t irq2_status = io_read(io, 5);
    uint32_t irq_handler = io_read(io, 6);
    
    if (irq0_enabled && irq0_status) {
        handle_timer_interrupt(cpu, io);
    } else if (irq1_enabled && irq1_status) {
        handle_disk_interrupt(cpu, io);
    } else if (irq2_enabled && irq2_status) {
        handle_external_interrupt(cpu, io);
    }
}

void handle_timer_interrupt(CPU* cpu, IO* io) {
    if (!cpu->in_isr) {
        cpu->in_isr = true;
        io_write(io, 3, 0);  // Clear timer interrupt
        io_write(io, 7, cpu->pc);  // Save return address
        cpu->pc = io_read(io, 6);  // Jump to interrupt handler
    }
}

void handle_disk_interrupt(CPU* cpu, IO* io) {
    if (!cpu->in_isr) {
        cpu->in_isr = true;
        io_write(io, 4, 0);  // Clear disk interrupt
        io_write(io, 7, cpu->pc);  // Save return address
        cpu->pc = io_read(io, 6);  // Jump to interrupt handler
    }
}

void handle_external_interrupt(CPU* cpu, IO* io) {
    if (!cpu->in_isr) {
        cpu->in_isr = true;
        io_write(io, 5, 0);  // Clear external interrupt
        io_write(io, 7, cpu->pc);  // Save return address
        cpu->pc = io_read(io, 6);  // Jump to interrupt handler
    }
}
