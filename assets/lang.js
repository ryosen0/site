const translations = {
  ru: {
    title: "ryosen0 — Визитка",
    description: "Визитка ryosen0: музыка, ретро-игры, покемоны, аниме, Япония.",
    setup: "Setup",
    backToMain: "← Вернуться на главную",
    donations: "Support",
    // Setup page
    photography: "Фототехника",
    camera: "Камера",
    lens: "Объектив",
    tripods: "Штативы",
    peripherals: "Периферия",
    mouse: "Мышка",
    mousepad: "Коврик",
    keyboard: "Клавиатура",
    headphones: "Наушники",
    microphone: "Микрофон",
    soundcard: "Звуковая карта",
    monitors: "Мониторы",
    mainMonitor: "Основной",
    secondMonitor: "Второй",
    portableMonitor: "Портативный",
    pcBuild: "Сборка ПК",
    storage: "Хранение данных",
    noName: "Безымянный с Али"
  },
  en: {
    title: "ryosen0 — Landing Page",
    description: "ryosen0's landing page: music, retro games, pokemon, anime, Japan.",
    setup: "Setup",
    backToMain: "← Back to Main",
    donations: "Support",
    // Setup page
    photography: "Photography",
    camera: "Camera",
    lens: "Lens",
    tripods: "Tripods",
    peripherals: "Peripherals",
    mouse: "Mouse",
    mousepad: "Mousepad",
    keyboard: "Keyboard",
    headphones: "Headphones",
    microphone: "Microphone",
    soundcard: "Sound Card",
    monitors: "Monitors",
    mainMonitor: "Main",
    secondMonitor: "Second",
    portableMonitor: "Portable",
    pcBuild: "PC Build",
    storage: "Storage",
    noName: "Nameless from Ali"
  }
};

// Get user's browser language
function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith('ru') ? 'ru' : 'en';
}

// Initialize with browser language or stored preference
let currentLang = localStorage.getItem('lang') || getBrowserLanguage();

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateContent();
  updateButtons();
}

function updateButtons() {
  // Remove active class from all buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  // Add active class to current language button
  const activeBtn = document.getElementById(currentLang + '-btn');
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

function updateContent() {
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(element => {
    const key = element.getAttribute('data-lang');
    if (translations[currentLang][key]) {
      if (element.tagName === 'META') {
        element.setAttribute('content', translations[currentLang][key]);
      } else {
        element.textContent = translations[currentLang][key];
      }
    }
  });
  
  // Update title
  document.title = translations[currentLang].title;
  
  // Update meta description if exists
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', translations[currentLang].description);
  }
}

// Initialize language and buttons on page load
document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  updateButtons();
}); 