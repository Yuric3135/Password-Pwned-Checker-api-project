# Password-Pwned-Checker-api-project

## Pwned Checker

A tool to check if your passwords or emails have appeared in known data breaches, using the Have I Been Pwned and XposedOrNot public APIs.

**Live demo:** https://yuric3135.github.io/Password-Pwned-Checker-api-project/

## What it does

You enter a password or an email, and the program tells you if it has appeared in any known data breaches — without ever sending the actual password over the internet.

## How it works

**Password check**
1. The password is converted into an SHA-1 hash (an irreversible code that cannot be turned back into the original password).
2. Only the first 5 characters of the hash are sent to the API (a k-anonymity technique).
3. The API returns a list of hashes that begin with those 5 characters.
4. The program locally compares the remainder of the hash against that list.
5. If a match is found, it displays how many times that password has appeared in breaches.

This ensures that the password itself never leaves your machine — neither in plain text nor as a complete hash.

**Email check**
The email is sent to the [XposedOrNot](https://xposedornot.com/) API, which returns a list of known breaches the email has appeared in, if any.

## Project structure

- `main.py` — CLI version. Lets you check a password or an email directly from the terminal, in a loop.
- `api.py` — FastAPI backend exposing `/check/{password}` and `/check-email/{email}` endpoints, with CORS enabled.
- `index.html`, `style.css`, `src/app.ts` — TypeScript web frontend that consumes the FastAPI backend, with dark mode and a small reactive mascot.

## How to run

**CLI version**

pip install requests
python main.py

**API version**

pip install fastapi uvicorn requests
python -m uvicorn api:app --reload

**Web frontend**

npm install
npx tsc

Then open `index.html` (e.g. with the VS Code Live Server extension). Update `API_URL` in `src/app.ts` if running the backend locally.

## Deployment

- Backend hosted on [Render](https://render.com)
- Frontend hosted on [GitHub Pages](https://pages.github.com)

## Technologies

- Python, FastAPI, `hashlib`, `requests`
- TypeScript, HTML, CSS
- APIs: [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords), [XposedOrNot](https://xposedornot.com/)

## Next steps

- Support for password lists via `.txt`/`.csv` file
