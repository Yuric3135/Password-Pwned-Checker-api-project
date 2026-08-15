from fastapi import FastAPI
import hashlib
import requests
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        print(f"An error occurred: {e}")
        return 0


@app.get("/")
def home():
    return {"message": "Welcome to the Pwned Password Checker API!"}


@app.get("/check/{password}")
def check(password: str):
    result = check_pwned(password)
    if result > 0:
        return {"password_pwned": True, "times": result}
    else:
        return {"password_pwned": False, "times": 0}


def check_email_breach(email):
    url = f"https://api.xposedornot.com/v1/check-email/{email}"
    response = requests.get(url)
    data = response.json()

    if "breaches" in data:
        return data["breaches"][0]
    return []

@app.get("/check-email/{email}")
def check_email(email: str):
    breaches = check_email_breach(email)
    return {"email_pwned": len(breaches) > 0, "breaches": breaches}