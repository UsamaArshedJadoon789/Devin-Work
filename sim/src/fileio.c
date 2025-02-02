#include "fileio.h"
#include <stdio.h>
#include <string.h>

bool load_instruction_memory(const char* filename, Memory* mem) {
    FILE* f = fopen(filename, "r");
    if (!f) return false;
    
    char line[13];
    int addr = 0;
    while (fgets(line, sizeof(line), f) && addr < 4096) {
        uint64_t instr;
        if (sscanf(line, "%12llx", &instr) == 1) {
            mem->instructions[addr++] = instr;
        }
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
        uint32_t data;
        if (sscanf(line, "%8x", &data) == 1) {
            mem->data[addr++] = data;
        }
    }
    fclose(f);
    return true;
}

bool load_disk(const char* filename, IO* io) {
    FILE* f = fopen(filename, "r");
    if (!f) return false;
    
    char line[3];
    int sector = 0, offset = 0;
    while (fgets(line, sizeof(line), f) && sector < 128) {
        uint8_t value;
        if (sscanf(line, "%2hhx", &value) == 1) {
            io->disk[sector][offset++] = value;
            if (offset == 512) {
                offset = 0;
                sector++;
            }
        }
    }
    fclose(f);
    return true;
}

bool load_irq2(const char* filename, IO* io) {
    FILE* f = fopen(filename, "r");
    if (!f) return false;
    
    uint32_t cycle;
    while (fscanf(f, "%u", &cycle) == 1) {
        if (cycle > 0) {
            io->registers[5] = 1;
            break;
        }
    }
    fclose(f);
    return true;
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
    FILE* f = fopen(filename, "w");
    if (!f) return;
    
    uint32_t pc = cpu->pc;
    uint64_t instr = cpu->instruction;
    uint32_t rd = (instr >> 32) & 0xF;
    uint32_t rs = (instr >> 28) & 0xF;
    uint32_t rt = (instr >> 24) & 0xF;
    
    fprintf(f, "%03X %012llX %08X %08X %08X\n",
            pc, instr, cpu->registers[rd],
            cpu->registers[rs], cpu->registers[rt]);
    fclose(f);
}

void save_hwregtrace(const char* filename, IO* io) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    
    for (int i = 0; i < 23; i++) {
        fprintf(f, "%u READ %08X\n", io->cycles, io->registers[i]);
    }
    fclose(f);
}

void save_cycles(const char* filename, CPU* cpu) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    fprintf(f, "%u", cpu->cycles);
    fclose(f);
}

void save_leds(const char* filename, IO* io) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    fprintf(f, "%08X\n", io->leds);
    fclose(f);
}

void save_display7seg(const char* filename, IO* io) {
    FILE* f = fopen(filename, "w");
    if (!f) return;
    fprintf(f, "%08X\n", io->display7seg);
    fclose(f);
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
