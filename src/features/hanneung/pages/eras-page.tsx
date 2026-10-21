import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { ERAS } from '../data/eras';
import { eraProgress } from '../lib/selectors';
import { cardClass, cardHoverClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import { PageHeader, ProgressBar } from '../components/primitives';

export function ErasPage() {
  const { completedSet } = useStudy();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="시대별 학습" desc={`선사 시대부터 현대까지, 시험 출제 흐름에 맞춰 ${ERAS.length}개 시대로 나눴습니다.`} />

      {/* 연표: 왼쪽 세로선 + 시대별 마커 */}
      <ol className="relative flex flex-col gap-4 before:absolute before:inset-y-2 before:left-[5px] before:w-0.5 before:bg-border md:before:left-[calc(9rem+29px)]">
        {ERAS.map((era) => {
          const p = eraProgress(era, completedSet);
          const complete = p.done === p.total;
          return (
            <li key={era.id} className="relative grid gap-1.5 pl-7 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-12 md:pl-0">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-1.5 left-0 size-3 rounded-full border-2 border-primary bg-background md:top-7 md:left-[calc(9rem+24px)]',
                  complete && 'bg-primary',
                )}
              />
              <span className="text-sm font-medium text-muted-foreground tabular-nums md:pt-5 md:text-right">{era.period}</span>
              <article className={cn(cardClass, cardHoverClass, 'flex flex-col gap-3')}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-bold">
                    <Link to={`/eras/${era.id}`} className="after:absolute after:inset-0 after:rounded-xl">
                      {era.name}
                    </Link>
                  </h2>
                  <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                    {p.done}/{p.total} 단원
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{era.desc}</p>
                <ProgressBar progress={p} label={`${era.name} 진도`} />
                <ul className="flex flex-wrap gap-1.5">
                  {era.topics.map((t) => (
                    <li
                      key={t.id}
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs',
                        completedSet.has(t.id)
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {t.title}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}