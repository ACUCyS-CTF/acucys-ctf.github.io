# SIGINT Relay

Basic challenge details:
- **Difficulty**: Easy
- **Points**: 50 (static)
- **Resources**: Click Here
- **Hints**:None

**Challenge Description**: Santa's on beach duty when a mysterious signal relay crackles to life offshore. It belongs to a covert unit and doesn't give up its secrets easily. Somewhere between the festive static and the summer heat, classified information is waiting to be uncovered. Tune in, keep your cool, and see what this holiday interception is really hiding.

**Made and submitted by**: Wathsala Dewmina on behalf of Legion Offensive Security

## Writeup

Let's start by running the binary to understand its behavior:

```
$ chmod +x challenge

$ ./challenge

=== SIGINT RELAY SYSTEM ===
Enter Agent ID: test
Enter Passcode: test
[-] Access Denied
```

The program requires valid credentials. First, let's use the strings command to extract readable text from the binary:

```
$ strings challenge | grep -i agent
$ strings challenge | grep -i pass
```

From the above command, we were able to discover
- Agent ID: `NIGHTHAWK`
- Password: `SIGMA-7`

Attemping to use those credentials gives us the flag.

```
$ ./challenge

=== SIGINT RELAY SYSTEM ===
Enter Agent ID: NIGHTHAWK
Enter Passcode: SIGMA-7
[+] Access Granted
[+] Decrypted Passphrase: ghost_raven_omega
[!] FLAG: AUCTF{b010d2f867c91a9e27f9a8684352f780}
```

For a complete understanding, let's reverse engineer the binary using Ghidra.

1. Open Ghidra and create a new project
2. Import the challenge binary
3. Run auto-analysis with default settings
4. Navigate to the main function

In the disassembly, locate the verify_access function. The decompiled code reveals:

```c
int verify_access(char *agent_id, char *passcode) {
    int result1 = strcmp(agent_id, "NIGHTHAWK");
    int result2 = strcmp(passcode, "SIGMA-7");
    
    if (result1 == 0 && result2 == 0) {
        return 1; // Access granted
    }
    
    return 0; // Access denied
}
```

The credentials are hardcoded directly in the binary. This is a critical security vulnerability. Next, we can find the encrypted secret. Navigate to the data section in Ghidra. You'll find an array labeled encrypted_secret:

```c
unsigned char encrypted_secret[17] = {
    0x25, 0x2a, 0x2d, 0x31, 0x36, 0x1d, 0x30, 0x23,
    0x34, 0x27, 0x2c, 0x1d, 0x2d, 0x2f, 0x27, 0x25, 0x23
};
```

Examine the `decrypt_secret` function:

```c
void decrypt_secret(unsigned char *data, int len, unsigned char key) {
    for (int i = 0; i < len; i++) {
        data[i] ^= key;
    }
}
```

This is a simple XOR cipher with a single-byte key. Following the code flow, we see the key is 0x42. Let's decrypt the secret using Python:

```python
#!/usr/bin/env python3
encrypted = [0x25, 0x2a, 0x2d, 0x31, 0x36, 0x1d, 0x30, 0x23, 0x34, 0x27, 0x2c, 0x1d, 0x2d, 0x2f, 0x27, 0x25, 0x23]
key = 0x42

decrypted = ''.join(chr(byte ^ key) for byte in encrypted)
print(decrypted)
```

This outputs: `ghost_raven_omega`.

The binary computes an MD5 hash of the decrypted secret to generate the flag:

```
$ echo -n "ghost_raven_omega" | md5sum

b010d2f867c91a9e27f9a8684352f780
```

Flag: `AUCTF{b010d2f867c91a9e27f9a8684352f780}`
