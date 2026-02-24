(() => {
  const storageKey = 'color-scheme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

  // These are hardcoded SVG constants, not user input - safe to use with innerHTML
  const sun = `
    <svg viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <line x1="12" y1="1.5" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22.5" y2="12" />
        <line x1="4.8" y1="4.8" x2="6.5" y2="6.5" />
        <line x1="17.5" y1="17.5" x2="19.2" y2="19.2" />
        <line x1="4.8" y1="19.2" x2="6.5" y2="17.5" />
        <line x1="17.5" y1="6.5" x2="19.2" y2="4.8" />
      </g>
    </svg>
  `;

  const moon = `
    <svg viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
      <path fill="currentColor" d="M20.354 15.354a1 1 0 0 0-1.066-.242A8 8 0 0 1 8.888 4.712a1 1 0 0 0-.242-1.066A1 1 0 0 0 7 4a10 10 0 1 0 13 13a1 1 0 0 0 .354-1.646Z"/>
    </svg>
  `;

  // System icon: small sun (upper-left) / small moon (lower-right) split by diagonal
  const system = `
    <svg viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
      <!-- Small sun in upper-left area, centered at (7, 7) -->
      <g transform="translate(7, 7) scale(0.5) translate(-12, -12)">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="12" y1="1.5" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22.5" y2="12" />
          <line x1="4.8" y1="4.8" x2="6.5" y2="6.5" />
          <line x1="17.5" y1="17.5" x2="19.2" y2="19.2" />
          <line x1="4.8" y1="19.2" x2="6.5" y2="17.5" />
          <line x1="17.5" y1="6.5" x2="19.2" y2="4.8" />
        </g>
      </g>
      <!-- Small moon in lower-right area, centered at (17, 17) -->
      <g transform="translate(17, 17) scale(0.5) translate(-12, -12)">
        <path fill="currentColor" d="M20.354 15.354a1 1 0 0 0-1.066-.242A8 8 0 0 1 8.888 4.712a1 1 0 0 0-.242-1.066A1 1 0 0 0 7 4a10 10 0 1 0 13 13a1 1 0 0 0 .354-1.646Z"/>
      </g>
      <!-- Diagonal divider line -->
      <line x1="24" y1="0" x2="0" y2="24" stroke="currentColor" stroke-width="1" />
    </svg>
  `;

  const icons = { light: sun, dark: moon, system };

  const normalizeMode = (value) =>
    value === 'light' || value === 'dark' || value === 'system' ? value : 'system';

  const getStored = () => normalizeMode(localStorage.getItem(storageKey));

  // Cycle: light -> system -> dark -> light
  const nextMode = {
    light: 'system',
    system: 'dark',
    dark: 'light',
  };

  function setKnobIcon(knob, mode) {
    // Using innerHTML with hardcoded SVG constants (not user input)
    knob.innerHTML = icons[mode];
  }

  function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    const track = document.getElementById('themeTrack');
    const knob = document.getElementById('themeKnob');
    const status = document.getElementById('themeToggleStatus');

    if (!btn || !track || !knob) return;

    const setVisual = (mode, effectiveDark) => {
      track.classList.remove('justify-start', 'justify-center', 'justify-end');
      if (mode === 'light') {
        track.classList.add('justify-start');
      } else if (mode === 'system') {
        track.classList.add('justify-center');
      } else {
        track.classList.add('justify-end');
      }
      setKnobIcon(knob, mode);
      btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : mode === 'system' ? 'mixed' : 'false');
      if (status) {
        const statusText =
          mode === 'system'
            ? `System preference (${effectiveDark ? 'dark' : 'light'})`
            : `${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`;
        status.textContent = statusText;
      }
    };

    const apply = (mode) => {
      const effectiveDark = mode === 'dark' || (mode === 'system' && prefersDark.matches);
      root.classList.toggle('dark', effectiveDark);
      root.dataset.theme = effectiveDark ? 'dark' : 'light';
      if (mode === 'system') {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, mode);
      }
      btn.dataset.mode = mode;
      setVisual(mode, effectiveDark);
    };

    let current = getStored();
    apply(current);

    btn.onclick = () => {
      current = nextMode[current];
      apply(current);
    };
  }

  // Run on initial load and after each client-side navigation.
  if (!window.__themeToggleInitBound) {
    document.addEventListener('astro:page-load', initThemeToggle);
    window.__themeToggleInitBound = true;
  }

  // Handle system preference changes.
  if (!window.__themeToggleSystemChangeBound) {
    prefersDark.addEventListener('change', () => {
      const stored = getStored();
      if (stored === 'system' || !localStorage.getItem(storageKey)) {
        const effectiveDark = prefersDark.matches;
        root.classList.toggle('dark', effectiveDark);
        root.dataset.theme = effectiveDark ? 'dark' : 'light';
        const knob = document.getElementById('themeKnob');
        const track = document.getElementById('themeTrack');
        const btn = document.getElementById('themeToggle');
        if (knob && track && btn) {
          const status = document.getElementById('themeToggleStatus');
          if (status) {
            status.textContent = `System preference (${effectiveDark ? 'dark' : 'light'})`;
          }
        }
      }
    });
    window.__themeToggleSystemChangeBound = true;
  }
})();
