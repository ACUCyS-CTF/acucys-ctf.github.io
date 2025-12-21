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

Made and submitted by:

## Writeup

