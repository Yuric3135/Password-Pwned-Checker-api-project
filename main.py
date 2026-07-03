import hashlib
import requests

def check_pwned(password):
    sha1_hash = hashlib.sha1(password.encode()).hexdigest().upper()
    prefix = sha1_hash[:5]
    suffix = sha1_hash[5:]
    
    url = f"https://api.pwnedpasswords.com/range/{prefix}"
    response = requests.get(url)
    try:
            if response.status_code == 200:
                for line in response.text.splitlines():
                    if line.startswith(suffix):
                        return int(line.split(":")[1])
            return 0
    except Exception as e:
        print(f"An error occurred while checking the password: {e}")
        return 0
    
password = input("Enter a password to check: ")
pwned_count = check_pwned(password)
print(f"The password '{password}' has been pwned {pwned_count} times.")
if pwned_count > 0:
    print("You should consider changing your password.")
else:
    print("Your password has not been found in any known breaches.")