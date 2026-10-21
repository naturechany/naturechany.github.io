import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Progress } from '../lib/selectors';
import type { Importance } from '../types';

export function ProgressBar({ progress, label, className }: { progress: Progress; label: string; className?: string }) {
  const pct = Math.round(progress.ratio * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-muted', className)}
    >
      <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}

const IMPORTANCE_LABEL: Record<Importance, string> = { 1: '기본', 2: '자주 출제', 3: '매회 출제' };

export function ImportanceBadge({ level }: { level: Importance }) {
  const hot = level === 3;
  return (
    <span
      title={`중요도: ${IMPORTANCE_LABEL[level]}`}
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-semibold',
        hot ? 'text-red-700 dark:text-red-400' : 'text-muted-foreground',
      )}
    >
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i
            key={n}
            className={cn(
              'size-1.5 rounded-full',
              n > level ? 'bg-border' : hot ? 'bg-red-700 dark:bg-red-400' : 'bg-primary',
            )}
          />
        ))}
      </span>
      {IMPORTANCE_LABEL[level]}
    </span>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed px-5 py-10 text-center text-sm text-muted-foreground">
      <p className="mb-1.5 font-semibold text-foreground">{title}</p>
      {children}
    </div>
  );
}

export function PageHeader({ eyebrow, title, desc, children }: { eyebrow?: string; title: string; desc?: string; children?: ReactNode }) {
  return (
    <header className="flex flex-col gap-2">
      {eyebrow && <p className="text-xs font-semibold tracking-wide text-primary tabular-nums">{eyebrow}</p>}
      <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{title}</h1>
      {desc && <p className="max-w-prose text-muted-foreground">{desc}</p>}
      {children}
    </header>
  );
}