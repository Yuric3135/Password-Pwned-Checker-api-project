# Password-Pwned-Checker-api-project
# Pwned Checker

A tool to check for leaked passwords using the Have I Been Pwned public API.

## What it does

You enter a password, and the program tells you if it has appeared in any known data breaches—without ever sending the actual password over the internet.

## How it works

1. The password is converted into an SHA-1 hash (an irreversible code that cannot be turned back into the original password).
2. Only the first 5 characters of the hash are sent to the API (a k-anonymity technique).
3. The API returns a list of hashes that begin with those 5 characters.
4. The program locally compares the remainder of the hash against that list.
5. If a match is found, it displays how many times that password has appeared in breaches.

This ensures that the password itself never leaves your machine—neither in plain text nor as a complete hash.

## How to run

```bash
pip install requests
python main.py
```

## Technologies

- Python
- `hashlib` (SHA-1 hashing)
- `requests` (API consumption)
- API: [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords)

## Next steps

- Support for password lists via `.txt` file
- Check for leaked emails
- Web interface
