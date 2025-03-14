# High-Entropy Random Number Generator

A comprehensive high-entropy random number generation system with multiple entropy sources and statistical testing capabilities.

## Features

- Multiple random number generation methods:
  - OS-provided entropy (os.urandom)
  - ChaCha20 cipher-based generation
  - OpenSSL-based generation
  - SSL module-based generation
  - CPU jitter-based entropy

- Entropy analysis using:
  - MATLAB (with fallback to SciPy)
  - Visualization of random number distribution

- NIST Statistical Tests:
  - Monobit Test
  - Runs Test
  - Frequency within Block Test

- Robust error handling and fallback mechanisms

## Requirements

- Python 3.6+
- Required packages:
  - numpy
  - matplotlib
  - pycryptodomex
  - scipy

- Optional:
  - MATLAB with Engine API for Python
  - OpenSSL

## Usage

```bash
python high_entropy_rng.py --method [os|chacha|openssl|ssl|jitter] --size [bytes]
```

Example:
```bash
python high_entropy_rng.py --method chacha --size 20000
```

## Testing

Run the test script to verify error handling and fallbacks:

```bash
python test_fallbacks.py
```

## Documentation

See `implementation_documentation.md` for detailed information about the design, implementation, and testing of this system.
