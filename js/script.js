// Elementleri seçiyoruz
const lengthInput = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate");
const resultDiv = document.getElementById("result");
const copyButton = document.getElementById("copy");
const reset = document.getElementById("reset");

// Karakter kümeleri
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+{}[]<>?";

// Buton tıklanınca şifre oluştur
generateButton.addEventListener("click", () => {
  const length = parseInt(lengthInput.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  const password = generatePassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  resultDiv.textContent = password;
  evaluateStrength(password);
  analyzePassword(password);
});

// Şifre oluşturma fonksiyonu
function generatePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  let characters = "";
  let password = "";

  if (includeUppercase) characters += UPPERCASE_CHARS;
  if (includeLowercase) characters += LOWERCASE_CHARS;
  if (includeNumbers) characters += NUMBER_CHARS;
  if (includeSymbols) characters += SYMBOL_CHARS;

  if (characters === "") return "Please select at least one option.";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

copyButton.addEventListener("click", () => {
  const password = resultDiv.textContent;

  if (!password || password === "Password" || password.startsWith("Please")) {
    alert("No valid password to copy.");
    return;
  }

  navigator.clipboard
    .writeText(password)
    .then(() => {
      alert("Password copied!");
    })
    .catch((err) => {
      console.error("Copy error:", err);
      alert("Copy failed.");
    });
});

reset.addEventListener("click", () => {
  document.getElementById("result").textContent = "Password";
  document.getElementById("strength").textContent = "";
  document.getElementById("analysis").textContent = "";
  lengthInput.value = 12;
  uppercaseCheckbox.checked = true;
  lowercaseCheckbox.checked = true;
  numbersCheckbox.checked = true;
  symbolsCheckbox.checked = false;
});

function evaluateStrength(password) {
  const strengthText = document.getElementById("strength");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    strengthText.textContent = "🔴 Weak";
    strengthText.style.color = "red";
  } else if (strength === 3 || strength === 4) {
    strengthText.textContent = "🟠 Mdium";
    strengthText.style.color = "orange";
  } else {
    strengthText.textContent = "🟢 Strong";
    strengthText.style.color = "green";
  }
}

function analyzePassword(password) {
    const analyzeText = document.getElementById("analysis");
    let issues = [];

    //uzunluk kontrolü

    if (password.length < 8) {
        issues.push("Password Lenght is to short!");
    }

    if (/([a-zA-Z0-9])\1{2,}/.test(password)) {
        issues.push("Too many same characters.");
    }
    if (/^[a-z]+$/i.test(password)) {
        issues.push("Only have letter.");
    } else if (/^[0-9]+$/.test(password)) {
        issues.push("Only have numbers.");
    }
    
    if (issues.length === 0) {
        analyzeText.textContent = "This password is safe!";
        analyzeText.style.color = "green";
    } else {
        analyzeText.textContent = issues.join(" ");
        analyzeText.style.color = "crimson";
    }
}