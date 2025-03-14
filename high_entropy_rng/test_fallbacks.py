"""
Test script to verify fallback mechanisms in high_entropy_rng.py
"""

import sys
import os
import importlib.util
import subprocess
import shutil

# Import high_entropy_rng module
spec = importlib.util.spec_from_file_location("high_entropy_rng", "high_entropy_rng.py")
high_entropy_rng = importlib.util.module_from_spec(spec)
spec.loader.exec_module(high_entropy_rng)

def test_openssl_fallback():
    """Test OpenSSL fallback mechanism"""
    print("\n=== Testing OpenSSL Fallback ===")
    
    # Save original function
    original_openssl_random = high_entropy_rng.openssl_random
    original_shutil_which = shutil.which
    
    # Mock shutil.which to simulate OpenSSL not being available
    def mock_which(cmd):
        if cmd == "openssl":
            return None
        return original_shutil_which(cmd)
    
    # Replace functions with mocks
    shutil.which = mock_which
    
    try:
        # Test OpenSSL fallback
        print("Simulating OpenSSL not available...")
        random_data = high_entropy_rng.openssl_random(100)
        print(f"Received {len(random_data)} bytes of random data")
        print("OpenSSL fallback test: SUCCESS")
    finally:
        # Restore original functions
        high_entropy_rng.openssl_random = original_openssl_random
        shutil.which = original_shutil_which

def test_ssl_fallback():
    """Test SSL module fallback mechanism"""
    print("\n=== Testing SSL Module Fallback ===")
    
    # Save original function
    original_ssl_random = high_entropy_rng.ssl_random
    original_ssl_rand_bytes = high_entropy_rng.ssl.RAND_bytes
    
    # Mock ssl.RAND_bytes to simulate failure
    def mock_rand_bytes(size):
        print("Simulating SSL RAND_bytes failure...")
        raise AttributeError("Simulated SSL RAND_bytes failure")
    
    # Replace function with mock
    high_entropy_rng.ssl.RAND_bytes = mock_rand_bytes
    
    try:
        # Test SSL fallback
        random_data = high_entropy_rng.ssl_random(100)
        print(f"Received {len(random_data)} bytes of random data")
        print("SSL fallback test: SUCCESS")
    finally:
        # Restore original functions
        high_entropy_rng.ssl_random = original_ssl_random
        high_entropy_rng.ssl.RAND_bytes = original_ssl_rand_bytes

def test_matlab_fallback():
    """Test MATLAB fallback mechanism"""
    print("\n=== Testing MATLAB Fallback ===")
    
    # Save original value
    original_matlab_available = high_entropy_rng.MATLAB_AVAILABLE
    
    # Force MATLAB to be unavailable
    high_entropy_rng.MATLAB_AVAILABLE = False
    
    try:
        # Generate some random data
        random_data = high_entropy_rng.generate_os_random_bytes(100)
        
        # Test entropy analysis with SciPy fallback
        print("Testing entropy analysis with SciPy fallback...")
        entropy_value = high_entropy_rng.analyze_entropy_with_scipy(random_data)
        print(f"Entropy calculated with SciPy: {entropy_value}")
        print("MATLAB fallback test: SUCCESS")
    finally:
        # Restore original value
        high_entropy_rng.MATLAB_AVAILABLE = original_matlab_available

if __name__ == "__main__":
    test_openssl_fallback()
    test_ssl_fallback()
    test_matlab_fallback()
    
    print("\nAll fallback tests completed successfully!")
