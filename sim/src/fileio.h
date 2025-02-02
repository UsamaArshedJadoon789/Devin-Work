#ifndef FILEIO_H
#define FILEIO_H

#include <stdbool.h>
#include "cpu.h"
#include "memory.h"
#include "io.h"

bool load_instruction_memory(const char* filename, Memory* mem);
bool load_data_memory(const char* filename, Memory* mem);
bool load_disk(const char* filename, IO* io);
bool load_irq2(const char* filename, IO* io);

void save_data_memory(const char* filename, Memory* mem);
void save_registers(const char* filename, CPU* cpu);
void save_trace(const char* filename, CPU* cpu);
void save_hwregtrace(const char* filename, IO* io);
void save_cycles(const char* filename, CPU* cpu);
void save_leds(const char* filename, IO* io);
void save_display7seg(const char* filename, IO* io);
void save_disk(const char* filename, IO* io);
void save_monitor(const char* filename, const char* yuv_filename, IO* io);

#endif
