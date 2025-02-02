# Matrix multiplication test (4x4 matrices)
# First matrix at 0x100-0x10F
# Second matrix at 0x110-0x11F
# Result matrix at 0x120-0x12F

.word 0x100 1  # First matrix
.word 0x101 2
.word 0x102 3
.word 0x103 4
.word 0x104 5
.word 0x105 6
.word 0x106 7
.word 0x107 8
.word 0x108 9
.word 0x109 10
.word 0x10A 11
.word 0x10B 12
.word 0x10C 13
.word 0x10D 14
.word 0x10E 15
.word 0x10F 16

.word 0x110 1  # Second matrix
.word 0x111 0
.word 0x112 0
.word 0x113 0
.word 0x114 0
.word 0x115 1
.word 0x116 0
.word 0x117 0
.word 0x118 0
.word 0x119 0
.word 0x11A 1
.word 0x11B 0
.word 0x11C 0
.word 0x11D 0
.word 0x11E 0
.word 0x11F 1

# Initialize result matrix to 0
.word 0x120 0
.word 0x121 0
.word 0x122 0
.word 0x123 0
.word 0x124 0
.word 0x125 0
.word 0x126 0
.word 0x127 0
.word 0x128 0
.word 0x129 0
.word 0x12A 0
.word 0x12B 0
.word 0x12C 0
.word 0x12D 0
.word 0x12E 0
.word 0x12F 0

# Matrix multiplication implementation
main:
    add $t0, $zero, $zero    # i = 0
outer_loop:
    add $t1, $zero, $zero    # j = 0
middle_loop:
    add $t2, $zero, $zero    # k = 0
    add $t3, $zero, $zero    # sum = 0
inner_loop:
    # Calculate addresses
    add $t4, $t0, $zero      # row1 = i
    sll $t4, $t4, 2          # row1 *= 4
    add $t4, $t4, $t2        # row1 += k
    add $t4, $t4, 0x100      # row1 += base1
    
    add $t5, $t2, $zero      # row2 = k
    sll $t5, $t5, 2          # row2 *= 4
    add $t5, $t5, $t1        # row2 += j
    add $t5, $t5, 0x110      # row2 += base2
    
    # Load values and multiply
    lw $t6, $t4, $zero       # val1 = M1[row1]
    lw $t7, $t5, $zero       # val2 = M2[row2]
    mul $t8, $t6, $t7        # prod = val1 * val2
    add $t3, $t3, $t8        # sum += prod
    
    add $t2, $t2, 1          # k++
    blt $t2, 4, inner_loop   # if k < 4 continue
    
    # Store result
    add $t4, $t0, $zero      # row = i
    sll $t4, $t4, 2          # row *= 4
    add $t4, $t4, $t1        # row += j
    add $t4, $t4, 0x120      # row += base_result
    sw $t3, $t4, $zero       # M3[row] = sum
    
    add $t1, $t1, 1          # j++
    blt $t1, 4, middle_loop  # if j < 4 continue
    
    add $t0, $t0, 1          # i++
    blt $t0, 4, outer_loop   # if i < 4 continue
    
    halt                     # End program
