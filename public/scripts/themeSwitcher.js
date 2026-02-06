(function() {
  const THEME_STORAGE_KEY = 'theme';
  const DEFAULT_THEME_CHOICE = 'system';

  function applyActualTheme() {
    const storedChoice = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_CHOICE;
    let themeToApply = storedChoice;

    if (storedChoice === 'system') {
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', themeToApply);
  }

  // Initialize if not set
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME_CHOICE);
  }

  // Handle clicks
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-set-theme]');
    if (target) {
      const newThemeChoice = target.getAttribute('data-set-theme');
      localStorage.setItem(THEME_STORAGE_KEY, newThemeChoice);
      applyActualTheme();
    }
  });

  // Handle system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem(THEME_STORAGE_KEY) === 'system') {
      applyActualTheme();
    }
  });

  // Handle cross-tab changes
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_STORAGE_KEY) {
      applyActualTheme();
    }
  });
})();
