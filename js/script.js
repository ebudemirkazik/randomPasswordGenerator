// Elementleri seçiyoruz
const lengthInput = document.getElementById("length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate");
const resultDiv = document.getElementById("result");

// Karakter kümeleri
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+{}[]<>?";

// Şifre oluşturma fonksiyonu
function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
  let characters = "";
  let password = "";

  if (includeUppercase) characters += UPPERCASE_CHARS;
  if (includeLowercase) characters += LOWERCASE_CHARS;
  if (includeNumbers) characters += NUMBER_CHARS;
  if (includeSymbols) characters += SYMBOL_CHARS;

  if (characters === "") return "Lütfen en az bir seçenek işaretleyin.";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

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
});
