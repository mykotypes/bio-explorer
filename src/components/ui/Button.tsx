import * as React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-600',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300'
  };

  return <button className={clsx(base, styles[variant], className)} {...props} />;
}