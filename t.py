import base64

# 1) the Base64 string after reversing + ROT13 stage
b64 = "BBQEGAM+EgwVGg0UCRgAFx51fHJyPA=="

# 2) decode to raw bytes (this is your 'cipher' bytes)
cipher = base64.b64decode(b64)
print("cipher bytes:", cipher.hex())

# 3) crib (known prefix of the flag)
crib = b"AUCTF" # exactly 5 bytes, matches the 5-byte key length

# 4) compute key bytes using the crib
key_bytes = bytes([cipher[i] ^ crib[i] for i in range(len(crib))])
print("key bytes (hex):", key_bytes.hex())
print("key bytes (ascii):", key_bytes.decode('ascii', errors='replace'))

# 5) use recovered key to decrypt entire ciphertext
key = key_bytes
plain = bytes([cipher[i] ^ key[i % len(key)] for i in range(len(cipher))])
print(plain.decode())