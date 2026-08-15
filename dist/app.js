"use strict";
const API_URL = "https://password-pwned-checker-api-project.onrender.com";
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
// Password elements
const button = document.getElementById("checkButton");
const input = document.getElementById("passwordInput");
const result = document.getElementById("result");
// Email elements
const emailButton = document.getElementById("checkEmailButton");
const emailInput = document.getElementById("emailInput");
const emailResult = document.getElementById("emailResult");
// Theme
const themeToggle = document.getElementById("themeToggle");
// Mascot
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
    if (data.password_pwned) {
        result.textContent = `This password has been pwned ${data.times} times! You should change it.`;
        reactMascot(false);
    }
    else {
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
    }
    else {
        emailResult.textContent = "This email has not been found in any known breaches.";
        reactMascot(true);
    }
});
themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙" : "☀️";
});
//# sourceMappingURL=app.js.map