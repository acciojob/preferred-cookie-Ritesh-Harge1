//your JS code here. If required.
const form = document.getElementById("font-form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Helper functions for cookies
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  // Set path=/ explicitly for Cypress to detect
  document.cookie = `${name}=${value};path=/;expires=${d.toUTCString()}`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// Apply saved preferences if they exist
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", `${savedFontSize}px`);
    fontSizeInput.value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    fontColorInput.value = savedFontColor;
  }
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;

  // Update CSS variables
  document.documentElement.style.setProperty("--fontsize", `${fontSize}px`);
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  // Save to cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // Ensure cookie is immediately accessible
  console.log("Cookies set:", document.cookie);
});

// Initialize
applyPreferences();
