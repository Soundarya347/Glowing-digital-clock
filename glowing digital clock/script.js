// script.js
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

// Color control elements
const hueSlider = document.getElementById("hue");
const saturationSlider = document.getElementById("saturation");
const brightnessSlider = document.getElementById("brightness");
const presetColors = document.querySelectorAll('.preset-color');

// Color preview elements
const huePreview = document.getElementById("hue-preview");
const saturationPreview = document.getElementById("saturation-preview");
const brightnessPreview = document.getElementById("brightness-preview");

// Current color values
let currentHue = 190;
let currentSaturation = 100;
let currentBrightness = 100;

// Update color previews
function updateColorPreviews() {
  huePreview.style.backgroundColor = `hsl(${currentHue}, 100%, 50%)`;
  saturationPreview.style.backgroundColor = `hsl(${currentHue}, ${currentSaturation}%, 50%)`;
  brightnessPreview.style.backgroundColor = `hsl(${currentHue}, ${currentSaturation}%, ${currentBrightness}%)`;
}

// Apply the current color to the clock
function applyColor() {
  const color = `hsl(${currentHue}, ${currentSaturation}%, ${currentBrightness}%)`;
  const clockElements = document.querySelectorAll('.clock span');
  
  clockElements.forEach(element => {
    element.style.color = color;
  });
  
  updateColorPreviews();
}

// Set color from RGB values
function setColorFromRGB(rgbString) {
  // Convert RGB to HSL
  const rgb = rgbString.match(/\d+/g);
  const r = parseInt(rgb[0]) / 255;
  const g = parseInt(rgb[1]) / 255;
  const b = parseInt(rgb[2]) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  currentHue = Math.round(h * 360);
  currentSaturation = Math.round(s * 100);
  currentBrightness = Math.round(l * 100);
  
  hueSlider.value = currentHue;
  saturationSlider.value = currentSaturation;
  brightnessSlider.value = currentBrightness;
  
  applyColor();
}

// Event listeners for color controls
hueSlider.addEventListener('input', function() {
  currentHue = this.value;
  applyColor();
});

saturationSlider.addEventListener('input', function() {
  currentSaturation = this.value;
  applyColor();
});

brightnessSlider.addEventListener('input', function() {
  currentBrightness = this.value;
  applyColor();
});

// Event listeners for preset colors
presetColors.forEach(preset => {
  preset.addEventListener('click', function() {
    setColorFromRGB(this.dataset.color);
  });
});

// Initialize color previews
updateColorPreviews();
applyColor();

function updateClock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = "AM";

  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourEl.innerText = h;
  minuteEl.innerText = m;
  secondEl.innerText = s;
  ampmEl.innerText = ampm;
  
  // Add pulsing animation to seconds
  if (s % 2 === 0) {
    secondEl.style.boxShadow = `0 0 25px currentColor`;
  } else {
    secondEl.style.boxShadow = `0 0 15px currentColor`;
  }
  
  setTimeout(() => {
    updateClock();
  }, 1000);
}

updateClock();