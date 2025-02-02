#include "interrupt.h"

void check_interrupts(CPU* cpu, IO* io) {
    if (cpu->in_isr) return;
    
    uint32_t irq0_enabled = io_read(io, 0);
    uint32_t irq1_enabled = io_read(io, 1);
    uint32_t irq2_enabled = io_read(io, 2);
    uint32_t irq0_status = io_read(io, 3);
    uint32_t irq1_status = io_read(io, 4);
    uint32_t irq2_status = io_read(io, 5);
    
    if (irq0_enabled && irq0_status) {
        handle_timer_interrupt(cpu, io);
    } else if (irq1_enabled && irq1_status) {
        handle_disk_interrupt(cpu, io);
    } else if (irq2_enabled && irq2_status) {
        handle_external_interrupt(cpu, io);
    }
}

static void enter_isr(CPU* cpu, IO* io, uint32_t irq_status_reg) {
    if (!cpu->in_isr) {
        cpu->in_isr = true;
        io_write(io, irq_status_reg, 0);
        io_write(io, 7, cpu->pc);
        cpu->pc = io_read(io, 6);
        cpu->cycles++;
    }
}

void handle_timer_interrupt(CPU* cpu, IO* io) {
    enter_isr(cpu, io, 3);
}

void handle_disk_interrupt(CPU* cpu, IO* io) {
    enter_isr(cpu, io, 4);
}

void handle_external_interrupt(CPU* cpu, IO* io) {
    enter_isr(cpu, io, 5);
}
