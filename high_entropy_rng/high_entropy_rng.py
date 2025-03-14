"""
High-Entropy Random Number Generator and Analyzer

This module provides multiple methods for generating high-entropy random numbers
and tools for analyzing their entropy and randomness properties.

The implementation includes:
1. OS-provided entropy (os.urandom)
2. ChaCha20 cipher-based generation
3. OpenSSL-based generation
4. CPU jitter-based entropy

It also provides tools for entropy analysis and statistical testing of randomness.
"""

import argparse
import os
import secrets
import subprocess
import shutil
import time
import hashlib
import numpy as np
from Cryptodome.Cipher import ChaCha20
from Cryptodome.Random import get_random_bytes
import matplotlib.pyplot as plt
from scipy import stats
import ssl

# Check if MATLAB is available
MATLAB_AVAILABLE = True
try:
    import matlab.engine
    MATLAB_AVAILABLE = True
    print("MATLAB Engine API is available.")
except ImportError:
    print("MATLAB Engine API is not available. Using SciPy for entropy analysis.")


def generate_os_random_bytes(size=10000):
    """Generate random bytes using the operating system's entropy pool."""
    return os.urandom(size)


def generate_secure_random_number():
    """Generate a 256-bit secure random number."""
    return secrets.randbits(256)


def generate_chacha20_random(size=10000):
    """Generate random bytes using the ChaCha20 cipher."""
    key = get_random_bytes(32)  # 256-bit key
    cipher = ChaCha20.new(key=key)
    return cipher.encrypt(b'\x00' * size)


def openssl_random(size=10000):
    """
    Generate random bytes using OpenSSL's RNG with error handling.
    Falls back to os.urandom if OpenSSL is not available.
    """
    # Check if OpenSSL is available
    if shutil.which("openssl") is None:
        print("OpenSSL not found. Falling back to os.urandom().")
        return os.urandom(size)
    
    cmd = f"openssl rand {size}"
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"OpenSSL command failed: {e.stderr.decode()}")
        print("Falling back to os.urandom().")
        return os.urandom(size)


def ssl_random(size=10000):
    """Generate random bytes using Python's SSL module."""
    try:
        return ssl.RAND_bytes(size)
    except (AttributeError, ssl.SSLError):
        print("SSL RAND_bytes not available. Falling back to os.urandom().")
        return os.urandom(size)


def generate_jitter_entropy(size=10000):
    """
    Generate random bytes based on CPU jitter entropy.
    This is a custom implementation that collects entropy from CPU timing variations.
    """
    entropy_pool = bytearray(size * 8)  # Collect 8x more raw entropy
    index = 0
    
    # Collect raw entropy from timing variations
    for _ in range(size * 8):
        start = time.time_ns()
        # Perform operations that will have variable timing
        for _ in range(1000):
            pass
        end = time.time_ns()
        
        # Extract the least significant bits of the timing difference
        jitter = (end - start) & 0xFF
        entropy_pool[index] = jitter
        index += 1
    
    # Hash the entropy pool to concentrate entropy
    result = bytearray(size)
    for i in range(size):
        chunk = entropy_pool[i*8:(i+1)*8]
        hash_obj = hashlib.sha256(bytes(chunk))
        result[i] = hash_obj.digest()[0]
        
    return bytes(result)


def analyze_entropy_with_matlab(random_bytes, eng):
    """
    Analyze the entropy of the random bytes using MATLAB.
    Converts byte values to floats, computes entropy, and displays a histogram.
    """
    # Convert bytes to float values for MATLAB
    random_values = [float(b) for b in random_bytes]
    matlab_array = matlab.double(random_values)
    entropy_value = eng.entropy(matlab_array)
    
    # Create a histogram plot in MATLAB
    eng.figure(nargout=0)
    eng.histogram(matlab_array, 'Normalization', 'pdf', nargout=0)
    eng.title("Random Number Distribution", nargout=0)
    eng.xlabel("Byte Value (0-255)", nargout=0)
    eng.ylabel("Probability Density", nargout=0)
    eng.show(nargout=0)
    
    return entropy_value


def analyze_entropy_with_scipy(random_bytes):
    """
    Analyze the entropy of random bytes using SciPy instead of MATLAB.
    """
    # Convert bytes to float values
    random_values = np.array([float(b) for b in random_bytes])
    
    # Calculate entropy using SciPy
    hist, _ = np.histogram(random_values, bins=256, density=True)
    entropy_value = stats.entropy(hist)
    
    # Create a histogram plot
    plt.figure()
    plt.hist(random_values, bins=256, density=True)
    plt.title("Random Number Distribution")
    plt.xlabel("Byte Value (0-255)")
    plt.ylabel("Probability Density")
    plt.savefig("random_distribution.png")  # Save the plot to a file
    print("Histogram saved to 'random_distribution.png'")
    
    return entropy_value


def monobit_test(bit_string):
    """
    NIST Monobit Test implementation.
    Tests whether the number of 0's and 1's are approximately equal.
    """
    # Count the number of 1's
    count = sum(1 for bit in bit_string if bit == '1')
    n = len(bit_string)
    
    # Calculate the test statistic
    s_obs = abs(count - (n - count)) / (n ** 0.5)
    
    # Calculate the p-value using the complementary error function
    from math import erfc
    p_value = erfc(s_obs / (2 ** 0.5))
    
    return "PASS" if p_value >= 0.01 else "FAIL", p_value


def runs_test(bit_string):
    """
    NIST Runs Test implementation.
    Tests whether the number of runs (sequences of consecutive 0's or 1's) 
    is as expected for a random sequence.
    """
    n = len(bit_string)
    ones_count = sum(1 for bit in bit_string if bit == '1')
    
    # Check if the test is applicable
    pi = ones_count / n
    if abs(pi - 0.5) >= (2 / (n ** 0.5)):
        return "N/A - Prerequisite monobit test failed", 0.0
    
    # Count the runs
    runs = 1
    for i in range(1, n):
        if bit_string[i] != bit_string[i-1]:
            runs += 1
    
    # Calculate the test statistic
    expected_runs = 2 * ones_count * (n - ones_count) / n + 1
    std_dev = ((2 * ones_count * (n - ones_count) * (2 * ones_count * (n - ones_count) - n)) / 
               ((n ** 2) * (n - 1))) ** 0.5
    z = (runs - expected_runs) / std_dev
    
    # Calculate the p-value
    from math import erfc
    p_value = erfc(abs(z) / (2 ** 0.5))
    
    return "PASS" if p_value >= 0.01 else "FAIL", p_value


def frequency_within_block_test(bit_string, block_size=128):
    """
    NIST Frequency Test within Block implementation.
    Tests whether the frequency of 1's within M-bit blocks is approximately M/2.
    """
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
    from scipy.stats import chi2
    p_value = 1 - chi2.cdf(chi_square, num_blocks)
    
    return "PASS" if p_value >= 0.01 else "FAIL", p_value


def run_nist_tests(random_data):
    """
    Run NIST randomness tests on the provided random data.
    """
    print("\nRunning NIST randomness tests...")
    # Convert the byte data to a bit string
    bit_string = ''.join(format(byte, '08b') for byte in random_data)
    
    # Monobit test
    monobit_result, monobit_p = monobit_test(bit_string)
    print(f"NIST Monobit Test: {monobit_result} (p-value: {monobit_p:.6f})")
    
    # Runs test
    runs_result, runs_p = runs_test(bit_string)
    print(f"NIST Runs Test: {runs_result} (p-value: {runs_p:.6f})")
    
    # Frequency test within a block
    freq_block_result, freq_block_p = frequency_within_block_test(bit_string)
    print(f"NIST Frequency Test within Block: {freq_block_result} (p-value: {freq_block_p:.6f})")
    
    return {
        "monobit": {"result": monobit_result, "p_value": monobit_p},
        "runs": {"result": runs_result, "p_value": runs_p},
        "frequency_block": {"result": freq_block_result, "p_value": freq_block_p}
    }


def main():
    parser = argparse.ArgumentParser(description="High-Entropy RNG Evaluation")
    parser.add_argument('--method', type=str, default='os',
                        choices=['os', 'chacha20', 'openssl', 'ssl', 'jitter'],
                        help='RNG method to use: os, chacha20, openssl, ssl, jitter')
    parser.add_argument('--size', type=int, default=10000,
                        help='Number of random bytes to generate')
    parser.add_argument('--save-data', action='store_true',
                        help='Save the generated random data to a file')
    parser.add_argument('--output-file', type=str, default='random_data.bin',
                        help='Output file for saving random data')
    args = parser.parse_args()
    
    # Initialize MATLAB engine if available
    eng = None
    global MATLAB_AVAILABLE
    if MATLAB_AVAILABLE:
        try:
            print("Starting MATLAB engine...")
            eng = matlab.engine.start_matlab()
        except Exception as e:
            print(f"Failed to start MATLAB engine: {e}")
            print("Falling back to SciPy for entropy analysis.")
            MATLAB_AVAILABLE = True
    
    # Select the RNG method based on command-line argument
    if args.method == 'os':
        print("Using os.urandom() method...")
        random_data = generate_os_random_bytes(args.size)
    elif args.method == 'chacha20':
        print("Using ChaCha20 RNG method...")
        random_data = generate_chacha20_random(args.size)
    elif args.method == 'openssl':
        print("Using OpenSSL RNG method...")
        random_data = openssl_random(args.size)
    elif args.method == 'ssl':
        print("Using SSL RNG method...")
        random_data = ssl_random(args.size)
    elif args.method == 'jitter':
        print("Using CPU jitter-based entropy method...")
        random_data = generate_jitter_entropy(args.size)
    else:
        print("Invalid method selected. Defaulting to os.urandom()")
        random_data = generate_os_random_bytes(args.size)
    
    # Save the random data if requested
    if args.save_data:
        with open(args.output_file, 'wb') as f:
            f.write(random_data)
        print(f"Random data saved to {args.output_file}")
    
    # Perform entropy analysis
    try:
        print("Performing entropy analysis...")
        if MATLAB_AVAILABLE and eng is not None:
            entropy_result = analyze_entropy_with_matlab(random_data, eng)
            print(f"Entropy Calculated in MATLAB: {entropy_result}")
        else:
            entropy_result = analyze_entropy_with_scipy(random_data)
            print(f"Entropy Calculated with SciPy: {entropy_result}")
    except Exception as e:
        print(f"Error during entropy analysis: {e}")
    
    # Run NIST statistical tests
    test_results = run_nist_tests(random_data)
    
    # Generate a summary report
    print("\nRandom Number Generation Summary:")
    print(f"Method: {args.method}")
    print(f"Size: {args.size} bytes")
    print(f"Entropy: {entropy_result:.6f}")
    print("NIST Test Results:")
    for test, result in test_results.items():
        print(f"  {test}: {result['result']} (p-value: {result['p_value']:.6f})")
    
    # Clean up MATLAB engine if it was used
    if MATLAB_AVAILABLE and eng is not None:
        eng.quit()


if __name__ == '__main__':
    main()
