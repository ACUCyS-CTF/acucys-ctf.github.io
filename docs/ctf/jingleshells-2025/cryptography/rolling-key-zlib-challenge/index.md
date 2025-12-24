# Rolling-Key Zlib Challenge

Basic challenge details:
- **Difficulty**: Medium
- **Points**: 200 (static)
- **Resources**: Click Here
- **Hints**: 1

**Challenge Description**: Santa left a curious holiday note buried in the sand - short, scrambled, and wrapped more times than a beachside present. At first glance it's just festive nonsense, but something familiar is hiding beneath the layers. Unwind the twists, follow the rhythm, and see what secret pops free once the holiday wrapping finally comes off.

**Hint**:

Start by turning the tale back to front, then swap letters with a shift of thirteen. The strange runes hide in a safe alphabet of sixty-four, but beware - their length must fit the rule of four.

A clever lock awaits: each step forward by seventy-three, then add seventeen, makes the teeth of the key that dances with the bytes.

When the dance is done, a familiar whisper begins with 78 9C - breathe air into it, and the secret name will appear.


**Made and submitted by**: Wooshan Gamage on behalf of Legion Offensive Security

## Writeup

Given inside the resource file is the string: `ZNhS-0DjGCDjflCBlJssM_LnUQip5BfyKiegjOR4Dopn`. The python script below shows the 5 steps that need to be followed to solve it.

```python
import base64, zlib

# string from output.txt from the resources
# ----------
output = "ZNhS-0DjGCDjflCBlJssM_LnUQip5BfyKiegjOR4Dopn"

# function to perform ROT13
# ----------
def rot13(s):
    out = []
    for ch in s:
        if 'a' <= ch <= 'z':
            out.append(chr((ord(ch) - 97 + 13) % 26 + 97))
        elif 'A' <= ch <= 'Z':
            out.append(chr((ord(ch) - 65 + 13) % 26 + 65))
        else:
            out.append(ch)
    return ''.join(out)

# Step 1: reverse the string
# ----------
rev = output[::-1]

# Step 2: undo ROT13 (symmetric)
# ----------
b64_urlsafe = rot13(rev)

# Step 3: URL-safe base64 decode
# ----------
decoded = base64.urlsafe_b64decode(b64_urlsafe)

# Step 4: XOR with rolling key (key[i] = (i*73 + 17) & 0xFF)
# ----------
key = bytes(((i * 73 + 17) & 0xFF) for i in range(len(decoded)))
xored = bytes(b ^ key[i] for i, b in enumerate(decoded))

# Step 5: zlib decompress to get the flag
# ----------
flag = zlib.decompress(xored).decode()

# display the flag 
# ----------
print(flag)
```

Executing this script gives you the flag: `AUCTF{Y0u_S0l3v3d_C6yPt0}`
