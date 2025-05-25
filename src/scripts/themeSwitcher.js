document.addEventListener('DOMContentLoaded', () => {
  const themeIcon = document.getElementById('theme-icon');

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    switch (theme) {
      case 'light':
        themeIcon.textContent = '☀️';
        break;
      case 'dark':
        themeIcon.textContent = '🌙';
        break;
      case 'cupcake':
        themeIcon.textContent = '🧁';
        break;
      default:
        themeIcon.textContent = '☀️';
    }
  }

  const currentTheme = localStorage.getItem('theme') || 'light';
  updateThemeIcon(currentTheme);

  document.querySelectorAll('[data-set-theme]').forEach(el => {
    el.addEventListener('click', () => {
      const newTheme = el.getAttribute('data-set-theme') || 'light';
      updateThemeIcon(newTheme);
    });
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      updateThemeIcon(e.newValue);
    }
  });
});
