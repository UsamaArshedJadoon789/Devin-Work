#include "fileio.h"
#include <stdio.h>

bool load_instruction_memory(const char* filename, Memory* mem) {
    FILE* f = fopen(filename, "r");
    if (!f) return false;
    
    char line[13];
    int addr = 0;
    while (fgets(line, sizeof(line), f) && addr < 4096) {
        sscanf(line, "%llx", &mem->instructions[addr++]);
    }
    fclose(f);
    return true;
}

bool load_data_memory(const char* filename, Memory* mem) {
    FILE* f = fopen(filename, "r");
    if (!f) return false;
    
    char line[9];
    int addr = 0;
    while (fgets(line, sizeof(line), f) && addr < 4096) {
        sscanf(line, "%x", &mem->data[addr++]);
    }
    fclose(f);
    return true;
}

bool load_disk(const char* filename, IO* io) {
    FILE* f = fopen(filename, "r");
    if (!f) return false;
    
    char line[9];
    int sector = 0, offset = 0;
    while (fgets(line, sizeof(line), f) && sector < 128) {
        uint32_t value;
        sscanf(line, "%x", &value);
        io->disk[sector][offset++] = value;
        if (offset == 512) {
            offset = 0;
            sector++;
        }
    }
    fclose(f);
    return true;
}

bool load_irq2(const char* filename, IO* io) {
    return true;  // Implement IRQ2 loading
}

void save_data_memory(const char* filename, Memory* mem) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    
    for (int i = 0; i < 4096; i++) {
        fprintf(f, "%08X\n", mem->data[i]);
    }
    fclose(f);
}

void save_registers(const char* filename, CPU* cpu) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    
    for (int i = 2; i < 16; i++) {
        fprintf(f, "%08X\n", cpu->registers[i]);
    }
    fclose(f);
}

void save_trace(const char* filename, CPU* cpu) {
    // Implement trace saving
}

void save_hwregtrace(const char* filename, IO* io) {
    // Implement hardware register trace saving
}

void save_cycles(const char* filename, CPU* cpu) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    fprintf(f, "%u", cpu->cycles);
    fclose(f);
}

void save_leds(const char* filename, IO* io) {
    // Implement LED state saving
}

void save_display7seg(const char* filename, IO* io) {
    // Implement 7-segment display saving
}

void save_disk(const char* filename, IO* io) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    
    for (int sector = 0; sector < 128; sector++) {
        for (int offset = 0; offset < 512; offset++) {
            fprintf(f, "%02X\n", io->disk[sector][offset]);
        }
    }
    fclose(f);
}

void save_monitor(const char* filename, const char* yuv_filename, IO* io) {
    FILE* f = fopen(filename, "w");
    FILE* yuv = fopen(yuv_filename, "wb");
    if (!f || !yuv) {
        if (f) fclose(f);
        if (yuv) fclose(yuv);
        return;
    }
    
    for (int y = 0; y < 256; y++) {
        for (int x = 0; x < 256; x++) {
            fprintf(f, "%02X\n", io->monitor[y][x]);
            fwrite(&io->monitor[y][x], 1, 1, yuv);
        }
    }
    
    fclose(f);
    fclose(yuv);
}
