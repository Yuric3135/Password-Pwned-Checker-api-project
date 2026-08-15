"use strict";
const API_URL = "http://localhost:8000";
async function checkPassword(password) {
    const response = await fetch(`${API_URL}/check/${password}`);
    const data = await response.json();
    return data;
}
async function checkEmail(email) {
    const response = await fetch(`${API_URL}/check-email/${email}`);
    const data = await response.json();
    return data;
}
const button = document.getElementById("checkButton");
const input = document.getElementById("passwordInput");
const result = document.getElementById("result");
const emailButton = document.getElementById("checkEmailButton");
const emailInput = document.getElementById("emailInput");
const emailResult = document.getElementById("emailResult");
const themeToggle = document.getElementById("themeToggle");
const mascot = document.getElementById("mascot");
function reactMascot(happy) {
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
    }
    else {
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
    }
    else {
        emailResult.textContent = "Esse email não foi encontrado em nenhum vazamento conhecido.";
        reactMascot(true);
    }
});
themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙" : "☀️";
});
//# sourceMappingURL=app.js.map