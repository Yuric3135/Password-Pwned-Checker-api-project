const API_URL = "http://localhost:8000";

interface PasswordCheckResponse {
  senha_vazada: boolean;
  vezes: number;
}

interface EmailCheckResponse {
  email_vazado: boolean;
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

const button = document.getElementById("checkButton") as HTMLButtonElement;
const input = document.getElementById("passwordInput") as HTMLInputElement;
const result = document.getElementById("result") as HTMLParagraphElement;

const emailButton = document.getElementById("checkEmailButton") as HTMLButtonElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const emailResult = document.getElementById("emailResult") as HTMLParagraphElement;

const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;

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

  if (data.senha_vazada) {
    result.textContent = `Essa senha foi vazada ${data.vezes} vezes! Troque ela.`;
    reactMascot(false);
  } else {
    result.textContent = "Essa senha não foi encontrada em nenhum vazamento conhecido.";
    reactMascot(true);
  }
});

emailButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const data = await checkEmail(email);

  if (data.email_vazado) {
    emailResult.textContent = `Esse email foi encontrado em ${data.breaches.length} vazamento(s): ${data.breaches.join(", ")}`;
    reactMascot(false);
  } else {
    emailResult.textContent = "Esse email não foi encontrado em nenhum vazamento conhecido.";
    reactMascot(true);
  }
});

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});