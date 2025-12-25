# SerialSleuth

Basic challenge details:
- **Difficulty**: Easy
- **Points**: 100 (static)
- **Resources**: Click Here
- **Hints**:None

**Challenge Description**: Santa's on holiday, but XYZ Ltd.'s legacy software isn’t feeling very festive - pirates are handing out copies like candy canes. You've been called in to audit the old desktop app before everyone heads to the beach. Somewhere inside this sun-bleached program lies the truth about how well its license check really holds up.

**Made and submitted by**: Wathsala Dewmina on behalf of Legion Offensive Security

## Writeup

Let's perform a quick initial analysis to observe the behaviour of our binary:

```
$ file license

license: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=44d54e8c0e38ec52924ea976f2d8f9330d3eea3b, for GNU/Linux 3.2.0, not stripped

$ ./license

Welcome to SecureApp License Validator v2.1
Enter your license key: 123456789012
Access denied!
```

We get access denied after entering an invalid license key.

Opening the binary in Ghidra, we can identify several key functions:
1. `main()` - Entry point
2. `validate_license()` - The real validation logic
3. `decrypt_string()` - XOR decryption routine
4. `check_debugger()` - Anti-debugging mechanism


`main()` function:

```c
undefined8 main(void)
{
    int iVar1;
    undefined8 uVar2;
    size_t sVar3;
    char local_188 [64];
    char local_148 [64];
    char local_108 [256];

    iVar1 = check_debugger();
    if (iVar1 == 0) {
        puts("Welcome to SecureApp License Validator v2.1");
        printf("Enter your license key: ");

        fgets(local_108,0x100,stdin);
        sVar3 = strcspn(local_108,"\\n");
        local_108[sVar3] = '\\0';
        fake_validation(local_108);
        iVar1 = validate_license(local_108);

        if (iVar1 == 0) {
            decrypt_string(encrypted_fail,local_188);
            puts(local_188);
        }
        else {
            decrypt_string(encrypted_success,local_148);
            puts(local_148);
        }
        uVar2 = 0;
    }
    else {
        puts("Analysis detected. Exiting.");
        uVar2 = 1;
    }
    return uVar2;
}
```

Key Insight in the main function is that the flag is hidden in the encrypted success message!

`validate_license()` function:

```c
undefined8 validate_license(char *param_1)
{
    int iVar1;
    size_t sVar2;
    undefined8 uVar3;
    int local_18;
    int local_14;
    int local_10;

    sVar2 = strlen(param_1);
    if (sVar2 == 0x18) {
        local_10 = 0;
        for (local_14 = 0; local_14 < 0xc; local_14 = local_14 + 1) {
            if ((local_14 % 3 == 0) && (param_1[local_14] != 'L')) {
                return 0;
            }
            if ((local_14 % 3 == 1) && (param_1[local_14] != 'F')) {
                return 0;
            }
            if ((local_14 % 3 == 2) && (param_1[local_14] != 'W')) {
                return 0;
            }
        }
        for (local_18 = 0xc; local_18 < 0x18; local_18 = local_18 + 1) {
            iVar1 = param_1[local_18] + -0x30;
            if ((iVar1 < 0) || (9 < iVar1)) {
                return 0;
            }
            local_10 = (iVar1 + local_10 * 10) % 0x539;
        }
        if (local_10 == 299) {
            uVar3 = 1;
        }
        else {
            uVar3 = 0;
        }
    }
    else {
        uVar3 = 0;
    }
    return uVar3;
}
```

This is where all the validation part happens.

License must be exactly 24 characters
```c
sVar2 = strlen(param_1);
if (sVar2 == 0x18) {
```

First 12 chars: Repeating "LFW" pattern → LFWLFWLFWLFW
```c
for (local_14 = 0; local_14 < 0xc; local_14 = local_14 + 1) {
    if ((local_14 % 3 == 0) && (param_1[local_14] != 'L')) {
        return 0;
    }
    if ((local_14 % 3 == 1) && (param_1[local_14] != 'F')) {
        return 0;
    }
    if ((local_14 % 3 == 2) && (param_1[local_14] != 'W')) {
        return 0;
    }
}
```

The last 12 chars must all be digits (0–9). They’re accumulated as if forming a number in base 10, but modulo 0x539 = 1337.

```c
for (local_18 = 0xc; local_18 < 0x18; local_18 = local_18 + 1) {
    iVar1 = param_1[local_18] + -0x30;
    if ((iVar1 < 0) || (9 < iVar1)) {
        return 0;
    }
    local_10 = (iVar1 + local_10 * 10) % 0x539;
}
```

Final check
```c
if (local_10 == 299) {
    uVar3 = 1;
}
```

So the number formed by last 12 digits (mod 1337) must equal 299.

We need to find 12 digits that satisfy: (digits_as_number) % 1337 = 299

The simplest solution: 000000000299

This number mod 1337 = 299

Construct Valid License
- Pattern: LFWLFWLFWLFW (first 12 chars) 
- Suffix: 000000000299 (last 12 chars)
- Final: LFWLFWLFWLFW000000000299

Finally, enter this as a your license:

```
$ ./license

Welcome to SecureApp License Validator v2.1
Enter your license key: LFWLFWLFWLFW000000000299
AUCTF{REDACTED}
```
