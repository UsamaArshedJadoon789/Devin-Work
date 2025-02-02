# Circle drawing program
# Radius at address 0x100
# Draws a filled white circle centered at (128,128)

.word 0x100 50  # radius = 50 pixels

main:
    # Initialize registers
    lw $t0, 0x100, $zero     # Load radius
    add $t1, $zero, 128      # Center x = 128
    add $t2, $zero, 128      # Center y = 128
    
    # Loop through all pixels
    add $t3, $zero, $zero    # y = 0
y_loop:
    add $t4, $zero, $zero    # x = 0
x_loop:
    # Calculate (x-cx)^2
    sub $t5, $t4, $t1        # dx = x - cx
    mul $t5, $t5, $t5        # dx^2
    
    # Calculate (y-cy)^2
    sub $t6, $t3, $t2        # dy = y - cy
    mul $t6, $t6, $t6        # dy^2
    
    # Calculate distance^2
    add $t5, $t5, $t6        # dist^2 = dx^2 + dy^2
    
    # Calculate radius^2
    mul $t6, $t0, $t0        # r^2
    
    # Compare distance^2 with radius^2
    bgt $t5, $t6, skip_pixel # if dist^2 > r^2, skip pixel
    
    # Calculate pixel address
    sll $t7, $t3, 8          # y * 256
    add $t7, $t7, $t4        # + x
    
    # Set monitor command registers
    add $t8, $zero, 0xFF     # White pixel
    out $t8, 13, $zero       # Set pixel value
    out $t7, 12, $zero       # Set pixel address
    add $t8, $zero, 1
    out $t8, 11, $zero       # Write pixel command
    
skip_pixel:
    add $t4, $t4, 1          # x++
    blt $t4, 256, x_loop     # if x < 256, continue x loop
    
    add $t3, $t3, 1          # y++
    blt $t3, 256, y_loop     # if y < 256, continue y loop
    
    halt                     # End program
