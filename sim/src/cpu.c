#include "cpu.h"
#include "memory.h"
#include "io.h"
#include "interrupt.h"

void cpu_init(CPU* cpu) {
    for (int i = 0; i < 16; i++) {
        cpu->registers[i] = 0;
    }
    cpu->pc = 0;
    cpu->instruction = 0;
    cpu->cycles = 0;
    cpu->halted = false;
    cpu->in_isr = false;
}

void cpu_execute(CPU* cpu, Memory* mem, IO* io) {
    if (cpu->halted) return;
    check_interrupts(cpu, io);
    
    cpu->instruction = mem->instructions[cpu->pc];
    uint32_t opcode = (cpu->instruction >> 40) & 0xFF;
    uint32_t rd = (cpu->instruction >> 32) & 0xF;
    uint32_t rs = (cpu->instruction >> 28) & 0xF;
    uint32_t rt = (cpu->instruction >> 24) & 0xF;
    uint32_t immediate = cpu->instruction & 0xFFFFF;
    
    if (rt == 1) {
        cpu->registers[1] = (immediate & 0x80000) ? (immediate | 0xFFF00000) : immediate;
    }
    
    switch (opcode) {
        case 0: // add
            cpu->registers[rd] = cpu->registers[rs] + (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 1: // sub
            cpu->registers[rd] = cpu->registers[rs] - (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 2: // mul
            cpu->registers[rd] = cpu->registers[rs] * (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 3: // and
            cpu->registers[rd] = cpu->registers[rs] & (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 4: // or
            cpu->registers[rd] = cpu->registers[rs] | (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 5: // xor
            cpu->registers[rd] = cpu->registers[rs] ^ (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 6: // sll
            cpu->registers[rd] = cpu->registers[rs] << (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 7: // sra
            cpu->registers[rd] = (int32_t)cpu->registers[rs] >> (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 8: // srl
            cpu->registers[rd] = cpu->registers[rs] >> (rt == 1 ? cpu->registers[1] : cpu->registers[rt]);
            break;
        case 9: // beq
            if (cpu->registers[rs] == (rt == 1 ? cpu->registers[1] : cpu->registers[rt])) {
                cpu->pc = rd;
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 10: // bne
            if (cpu->registers[rs] != (rt == 1 ? cpu->registers[1] : cpu->registers[rt])) {
                cpu->pc = rd;
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 11: // blt
            if ((int32_t)cpu->registers[rs] < (int32_t)(rt == 1 ? cpu->registers[1] : cpu->registers[rt])) {
                cpu->pc = rd;
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 12: // bgt
            if ((int32_t)cpu->registers[rs] > (int32_t)(rt == 1 ? cpu->registers[1] : cpu->registers[rt])) {
                cpu->pc = rd;
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 13: // ble
            if ((int32_t)cpu->registers[rs] <= (int32_t)(rt == 1 ? cpu->registers[1] : cpu->registers[rt])) {
                cpu->pc = rd;
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 14: // bge
            if ((int32_t)cpu->registers[rs] >= (int32_t)(rt == 1 ? cpu->registers[1] : cpu->registers[rt])) {
                cpu->pc = rd;
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 15: // jal
            cpu->registers[rd] = cpu->pc + 1;
            cpu->pc = (rs << 4) | rt;
            cpu->cycles++;
            io_update(io);
            return;
        case 16: // lw
            cpu->registers[rd] = memory_read(mem, cpu->registers[rs] + (rt == 1 ? cpu->registers[1] : cpu->registers[rt]));
            break;
        case 17: // sw
            memory_write(mem, cpu->registers[rs] + (rt == 1 ? cpu->registers[1] : cpu->registers[rt]), cpu->registers[rd]);
            break;
        case 18: // reti
            if (cpu->in_isr) {
                cpu->in_isr = false;
                cpu->pc = io_read(io, 7);
                cpu->cycles++;
                io_update(io);
                return;
            }
            break;
        case 19: // in
            cpu->registers[rd] = io_read(io, cpu->registers[rs] + (rt == 1 ? cpu->registers[1] : cpu->registers[rt]));
            break;
        case 20: // out
            io_write(io, cpu->registers[rs] + (rt == 1 ? cpu->registers[1] : cpu->registers[rt]), cpu->registers[rd]);
            break;
        case 21: // halt
            cpu->halted = true;
            break;
    }
    
    cpu->registers[0] = 0;
    cpu->pc++;
    cpu->cycles++;
    io_update(io);
}
