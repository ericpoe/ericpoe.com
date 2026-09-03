// Applies the stored / system color scheme before first paint to avoid a flash.
// Loaded as an external same-origin script so it satisfies `script-src 'self'`
// (inline scripts are blocked by the production CSP). Keep in sync with the
// initial state logic in public/scripts/theme-toggle.js.
(() => {
  const root = document.documentElement;
  let stored;

  try {
    stored = localStorage.getItem('color-scheme');
  } catch {
    stored = null;
  }

  const mode = stored === 'light' || stored === 'dark' ? stored : 'system';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

  root.classList.toggle('dark', isDark);
  root.dataset.theme = isDark ? 'dark' : 'light';
})();
