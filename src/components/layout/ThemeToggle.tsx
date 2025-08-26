'use client';
import * as React from 'react';

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-xl border px-3 py-1 text-xs"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}