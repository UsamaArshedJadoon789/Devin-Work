cmake_minimum_required(VERSION 3.10)
project(simp_simulator C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

add_executable(sim
    src/main.c
    src/cpu.c
    src/memory.c
    src/io.c
    src/interrupt.c
    src/fileio.c
)

target_include_directories(sim PRIVATE src)
