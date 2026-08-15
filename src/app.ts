const API_URL = "http://localhost:8000";

interface PasswordCheckResponse {
  password_pwned: boolean;
  times: number;
}

interface EmailCheckResponse {
  email_pwned: boolean;
  breaches: string[];
}

async function checkPassword(password: string): Promise<PasswordCheckResponse> {
  const response = await fetch(`${API_URL}/check/${password}`);
  const data: PasswordCheckResponse = await response.json();
  return data;
}

async function checkEmail(email: string): Promise<EmailCheckResponse> {
  const response = await fetch(`${API_URL}/check-email/${email}`);
  const data: EmailCheckResponse = await response.json();
  return data;
}

// Password elements
const button = document.getElementById("checkButton") as HTMLButtonElement;
const input = document.getElementById("passwordInput") as HTMLInputElement;
const result = document.getElementById("result") as HTMLParagraphElement;

// Email elements
const emailButton = document.getElementById("checkEmailButton") as HTMLButtonElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const emailResult = document.getElementById("emailResult") as HTMLParagraphElement;

// Theme
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;

// Mascot
const mascot = document.getElementById("mascot") as HTMLDivElement;

function reactMascot(happy: boolean) {
  mascot.textContent = happy ? "✅" : "⚠️";
  mascot.className = "mascot " + (happy ? "happy" : "sad");
  setTimeout(() => {
    mascot.textContent = "🛡️";
    mascot.className = "mascot";
  }, 2500);
}

button.addEventListener("click", async () => {
  const password = input.value;
  const data = await checkPassword(password);

  if (data.password_pwned) {
    result.textContent = `This password has been pwned ${data.times} times! You should change it.`;
    reactMascot(false);
  } else {
    result.textContent = "This password has not been found in any known breaches.";
    reactMascot(true);
  }
});

emailButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const data = await checkEmail(email);

  if (data.email_pwned) {
    emailResult.textContent = `This email was found in ${data.breaches.length} breach(es): ${data.breaches.join(", ")}`;
    reactMascot(false);
  } else {
    emailResult.textContent = "This email has not been found in any known breaches.";
    reactMascot(true);
  }
});

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});