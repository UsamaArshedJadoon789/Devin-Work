# Recursive binomial coefficient calculator
# n at address 0x100
# k at address 0x101
# Result stored at address 0x102

# Initialize input values
.word 0x100 5  # n = 5
.word 0x101 2  # k = 2
.word 0x102 0  # result

# Stack pointer starts at 0x800
add $sp, $zero, $zero
add $t0, $zero, 0x800
add $sp, $sp, $t0

# Main program
main:
    lw $a0, 0x100, $zero  # Load n
    lw $a1, 0x101, $zero  # Load k
    jal $ra, binom, $zero # Call binom(n,k)
    sw $v0, 0x102, $zero  # Store result
    halt

# Recursive binomial coefficient function
# $a0: n, $a1: k
# Returns result in $v0
binom:
    # Save registers
    sub $sp, $sp, 3
    sw $ra, $sp, 0
    sw $a0, $sp, 1
    sw $a1, $sp, 2
    
    # Base cases
    beq $a1, $zero, return_one
    beq $a0, $a1, return_one
    
    # Recursive case
    sub $a0, $a0, 1       # n-1
    jal $t0, binom, $zero # binom(n-1,k)
    
    # Save first result
    add $t1, $v0, $zero
    
    # Load saved registers for second call
    lw $a0, $sp, 1
    lw $a1, $sp, 2
    sub $a0, $a0, 1       # n-1
    sub $a1, $a1, 1       # k-1
    jal $t0, binom, $zero # binom(n-1,k-1)
    
    # Add results
    add $v0, $v0, $t1
    
    # Restore registers and return
    lw $ra, $sp, 0
    add $sp, $sp, 3
    jal $zero, $ra, $zero

return_one:
    add $v0, $zero, 1
    lw $ra, $sp, 0
    add $sp, $sp, 3
    jal $zero, $ra, $zero
