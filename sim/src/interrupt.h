#ifndef INTERRUPT_H
#define INTERRUPT_H

#include "cpu.h"
#include "io.h"

void check_interrupts(CPU* cpu, IO* io);
void handle_timer_interrupt(CPU* cpu, IO* io);
void handle_disk_interrupt(CPU* cpu, IO* io);
void handle_external_interrupt(CPU* cpu, IO* io);

#endif
