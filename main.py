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

def check_email_breach(email):
    url = f"https://api.xposedornot.com/v1/check-email/{email}"
    response = requests.get(url)
    data = response.json()

    if "breaches" in data:
        breach_list = data["breaches"][0]
        return breach_list
    else:
        return []

def main():
    while True:
        choice = input("Check a password (1), an email (2), or 'sair' to exit: ") 

        if choice.lower() == "sair":
            print("Saindo...")
            break

        elif choice == "1":
            password = input("Enter a password to check: ")
            pwned_count = check_pwned(password)

            print(f"The password '{password}' has been pwned {pwned_count} times.")
            if pwned_count > 0:
                print("You should consider changing your password.")
            else:
                print("Your password has not been found in any known breaches.")

        elif choice == "2":
            email = input("Enter an email to check: ")
            try:
                breaches = check_email_breach(email)
                if breaches:
                    print(f"The email '{email}' was found in {len(breaches)} breach(es):")
                    for name in breaches:
                        print(f" - {name}")
                else:
                    print(f"The email '{email}' was not found in any known breaches.")
            except Exception as e:
                print(f"Erro ao checar o email: {e}")

        else:
            print("Invalid choice. Please enter 1, 2, or 'sair'.")

        print()  
if __name__ == "__main__":
    main()