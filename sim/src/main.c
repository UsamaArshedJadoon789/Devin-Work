#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include "cpu.h"
#include "memory.h"
#include "io.h"
#include "fileio.h"

int main(int argc, char *argv[]) {
    if (argc != 15) {
        fprintf(stderr, "Usage: %s imemin.txt dmemin.txt diskin.txt irq2in.txt dmemout.txt regout.txt trace.txt hwregtrace.txt cycles.txt leds.txt display7seg.txt diskout.txt monitor.txt monitor.yuv\n", argv[0]);
        return 1;
    }

    CPU cpu;
    Memory memory;
    IO io;

    if (!load_instruction_memory(argv[1], &memory) ||
        !load_data_memory(argv[2], &memory) ||
        !load_disk(argv[3], &io) ||
        !load_irq2(argv[4], &io)) {
        return 1;
    }

    cpu_init(&cpu);
    memory_init(&memory);
    io_init(&io);

    while (!cpu.halted) {
        cpu_execute(&cpu, &memory, &io);
    }

    save_data_memory(argv[5], &memory);
    save_registers(argv[6], &cpu);
    save_trace(argv[7], &cpu);
    save_hwregtrace(argv[8], &io);
    save_cycles(argv[9], &cpu);
    save_leds(argv[10], &io);
    save_display7seg(argv[11], &io);
    save_disk(argv[12], &io);
    save_monitor(argv[13], argv[14], &io);

    return 0;
}
