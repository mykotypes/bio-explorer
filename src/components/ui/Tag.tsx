import * as React from 'react';
import clsx from 'clsx';

export function Tag({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span className={clsx('rounded-full bg-sslate-100 px-3 py-1 text-xs font-medium text-slate-700', className)}>
      {children}
    </span>
  );
}