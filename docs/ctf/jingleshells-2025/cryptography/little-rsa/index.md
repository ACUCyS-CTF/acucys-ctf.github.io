# Little RSA

Basic challenge details:
- **Difficulty**: Easy
- **Points**: 150 (static)
- **Resources**: Click Here
- **Hints**:1

**Challenge Description**: Santa's swapped his calculator for a coconut, but someone left a festive lockbox behind in the sand. The numbers look small, scrambled, and a little sun-baked - yet there's a message hiding beneath the holiday math. Piece together what was meant to stay bundled up, and unwrap a cryptographic gift before the tide rolls in.

**Hint**:

-  `p_chunks = [6572, 41452, 46393, 54330, 122, 36713, 21898, 50240]`
-  `q_chunks = [42796, 7981, 54306, 16794, 48654, 26191, 26414, 4248`
-  `e = 65537`
-  Each chunk = `16-bit` little-endian chunk `+ 27`

Each number is a little `16-bit` block that was nudged by `+27`. Subtract `27`, stitch the blocks in little-endian order to re-create p and q. Then compute `d = e^{-1} (mod φ(n))` and do `m = c^d mod n`. Convert `m` to bytes for the flag

**Made and submitted by**: Wooshan Gamage on behalf of Legion Offensive Security

## Writeup

The python script below covers everything in detail. 

```python
# Each number is a little 16-bit block that was nudged by +27. Subtract 27, stitch the blocks in little-endian order to re-create p and q. Then compute d = e^{-1} (mod φ(n)) and do m = c^d mod n. Convert m to bytes for the flag. 
# ---------
c = 53856185601553535047033517451772963437013660630686763181356136416343781555254
p_chunks = [6572, 41452, 46393, 54330, 122, 36713, 21898, 50240] 
q_chunks = [42796, 7981, 54306, 16794, 48654, 26191, 26414, 42486] 
e = 65537 


# Undo the chunk obfuscation (reassemble primes)
# For each chunk value v at index i (0-based):
#   - subtract the added constant: w = (v - 27) & 0xFFFF (keep 16 bits)
#   - place it into p or q with little-endian ordering: x |= w << (i * 16)
# Repeat for all chunks to get integers p and q
# ---------
def reassemble(chunks, chunk_bits=16, add=27):
    x = 0
    for i, v in enumerate(chunks):
        x |= ((v - add) & ((1<<chunk_bits)-1)) << (i*chunk_bits)
    return x

p = reassemble(p_chunks)
q = reassemble(q_chunks)


# Compute modulus and totient
# ---------
n = p * q
phi = (p-1)*(q-1)

# Compute private exponent
#   d = e^(-1) mod phi
# This can be done in python with the `pow()` function
# ---------
d = pow(e, -1, phi)

# Decrypt ciphertext
# ---------
m = pow(c, d, n)

# Convert to a readable flag
b = m.to_bytes((m.bit_length()+7)//8, 'big')
flag = b.decode()

print(flag)
```

This script outputs the flag: `AUCTF{h3Y_C4yPt0_B066}`.
