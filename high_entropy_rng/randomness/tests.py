"""
NIST Statistical Test Suite Implementation

This module provides implementations of several NIST statistical tests
for random number generators, as described in NIST Special Publication 800-22.
"""

from math import erfc, sqrt
from scipy.stats import chi2

def monobit_test(bit_string):
    """
    NIST Monobit Test implementation.
    
    Tests whether the number of 0's and 1's are approximately equal.
    
    Args:
        bit_string (str): A string of '0' and '1' characters
        
    Returns:
        tuple: (result, p_value) where result is "PASS" if p_value >= 0.01 else "FAIL"
    """
    print("Running NIST Monobit Test")
    
    # Count the number of 1's
    count = sum(1 for bit in bit_string if bit == '1')
    n = len(bit_string)
    
    # Calculate the test statistic
    s_obs = abs(count - (n - count)) / sqrt(n)
    
    # Calculate the p-value using the complementary error function
    p_value = erfc(s_obs / sqrt(2))
    
    return "PASS" if p_value >= 0.01 else "FAIL", p_value

def runs_test(bit_string):
    """
    NIST Runs Test implementation.
    
    Tests whether the number of runs (sequences of consecutive 0's or 1's) 
    is as expected for a random sequence.
    
    Args:
        bit_string (str): A string of '0' and '1' characters
        
    Returns:
        tuple: (result, p_value) where result is "PASS" if p_value >= 0.01 else "FAIL"
    """
    print("Running NIST Runs Test")
    
    n = len(bit_string)
    ones_count = sum(1 for bit in bit_string if bit == '1')
    
    # Check if the test is applicable
    pi = ones_count / n
    if abs(pi - 0.5) >= (2 / sqrt(n)):
        return "N/A - Prerequisite monobit test failed", 0.0
    
    # Count the runs
    runs = 1
    for i in range(1, n):
        if bit_string[i] != bit_string[i-1]:
            runs += 1
    
    # Calculate the test statistic
    expected_runs = 2 * ones_count * (n - ones_count) / n + 1
    std_dev = sqrt((2 * ones_count * (n - ones_count) * (2 * ones_count * (n - ones_count) - n)) / 
                  ((n ** 2) * (n - 1)))
    z = (runs - expected_runs) / std_dev
    
    # Calculate the p-value
    p_value = erfc(abs(z) / sqrt(2))
    
    return "PASS" if p_value >= 0.01 else "FAIL", p_value

def frequency_within_block_test(bit_string, block_size=128):
    """
    NIST Frequency Test within Block implementation.
    
    Tests whether the frequency of 1's within M-bit blocks is approximately M/2.
    
    Args:
        bit_string (str): A string of '0' and '1' characters
        block_size (int): Size of blocks to analyze
        
    Returns:
        tuple: (result, p_value) where result is "PASS" if p_value >= 0.01 else "FAIL"
    """
    print("Running NIST Frequency Test within Block")
    
    n = len(bit_string)
    
    # Check if there are enough bits for the test
    if n < block_size:
        return "N/A - Not enough bits for block test", 0.0
    
    # Calculate the number of blocks
    num_blocks = n // block_size
    
    # Calculate the proportion of 1's in each block
    proportions = []
    for i in range(num_blocks):
        block = bit_string[i*block_size:(i+1)*block_size]
        ones_count = sum(1 for bit in block if bit == '1')
        proportions.append(ones_count / block_size)
    
    # Calculate the chi-square statistic
    chi_square = 4 * block_size * sum((p - 0.5)**2 for p in proportions)
    
    # Calculate the p-value
    p_value = 1 - chi2.cdf(chi_square, num_blocks)
    
    return "PASS" if p_value >= 0.01 else "FAIL", p_value
