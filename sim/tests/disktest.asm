# Disk sector manipulation test
# Moves contents of sectors 0-7 forward by one position
# Sector 1 gets contents of sector 0, sector 2 gets sector 1, etc.

main:
    add $t0, $zero, $zero    # Current sector = 0
    add $t1, $zero, 7        # Last sector to process
    
loop:
    # Set up disk read from current sector
    out $t0, 15, $zero       # Set sector number
    add $t2, $zero, 0x100    # Buffer address = 0x100
    out $t2, 16, $zero       # Set buffer address
    add $t3, $zero, $zero    # Read command (0)
    out $t3, 17, $zero       # Set read/write mode
    add $t3, $zero, 1        # Start command
    out $t3, 14, $zero       # Execute disk read
    
wait_read:
    in $t3, 14, $zero        # Check disk status
    bne $t3, $zero, wait_read # If busy, keep waiting
    
    # Set up disk write to next sector
    add $t3, $t0, 1          # Next sector
    out $t3, 15, $zero       # Set sector number
    add $t3, $zero, 1        # Write command (1)
    out $t3, 17, $zero       # Set read/write mode
    add $t3, $zero, 1        # Start command
    out $t3, 14, $zero       # Execute disk write
    
wait_write:
    in $t3, 14, $zero        # Check disk status
    bne $t3, $zero, wait_write # If busy, keep waiting
    
    add $t0, $t0, 1          # Move to next sector
    ble $t0, $t1, loop       # Continue if not done
    
    halt                     # End program
