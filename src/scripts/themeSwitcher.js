document.addEventListener('DOMContentLoaded', () => {
  const THEME_STORAGE_KEY = 'theme';
  const DEFAULT_THEME_CHOICE = 'system'; // Opção padrão é 'system' se nenhuma escolha estiver armazenada

  // Função para aplicar o tema real (light/dark) ao elemento HTML
  function applyActualTheme() {
    const storedChoice = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_CHOICE;
    let themeToApply;

    if (storedChoice === 'system') {
      // Se a escolha for 'system', verifica a preferência do SO
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      themeToApply = prefersDark ? 'dark' : 'light';
    } else {
      // Caso contrário, usa a escolha armazenada ('light' ou 'dark')
      themeToApply = storedChoice;
    }
    // Define o atributo data-theme no elemento <html>, que efetivamente aplica o tema CSS
    document.documentElement.setAttribute('data-theme', themeToApply);
  }

  // Aplicação inicial do tema no carregamento da página
  // Garante que o localStorage tenha um valor na primeira visita ou se for limpo
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME_CHOICE);
  }
  applyActualTheme(); // Aplica o tema com base na escolha armazenada ou padrão

  // Event listeners para os botões do seletor de tema
  document.querySelectorAll('[data-set-theme]').forEach(el => {
    el.addEventListener('click', (event) => {
      const newThemeChoice = event.currentTarget.getAttribute('data-set-theme');
      localStorage.setItem(THEME_STORAGE_KEY, newThemeChoice); // Armazena a ESCOLHA (pode ser 'system')
      applyActualTheme(); // Aplica o tema REAL (light/dark)
      // O script do ThemeIcon.astro (via MutationObserver ou outros listeners) atualizará o ícone
      // com base na mudança do atributo 'data-theme' no HTML.
    });
  });

  // Escuta por mudanças na preferência de tema do sistema operacional
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const currentChoice = localStorage.getItem(THEME_STORAGE_KEY);
      // Se a escolha atual do usuário for 'system', reaplica o tema para refletir a mudança do SO
      if (currentChoice === 'system') {
        applyActualTheme();
      }
    });
  }

  // Escuta por mudanças no localStorage (ex: tema atualizado em outra aba)
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_STORAGE_KEY) {
      applyActualTheme(); // Re-aplica o tema se a chave de tema mudar
    }
  });
});