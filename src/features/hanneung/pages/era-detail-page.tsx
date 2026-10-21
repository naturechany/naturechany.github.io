import { Link, useParams } from 'react-router';
import { Bookmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ERAS } from '../data/eras';
import { eraProgress, getEra } from '../lib/selectors';
import { cardClass, cardHoverClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import { Breadcrumbs } from '../components/breadcrumbs';
import { Pager } from '../components/pager';
import { ImportanceBadge, PageHeader, ProgressBar } from '../components/primitives';
import { NotFoundPage } from './not-found-page';

export function EraDetailPage() {
  const { eraId = '' } = useParams();
  const { completedSet, bookmarkSet } = useStudy();
  const era = getEra(eraId);
  if (!era) return <NotFoundPage />;

  const idx = ERAS.indexOf(era);
  const prev = ERAS[idx - 1];
  const next = ERAS[idx + 1];
  const p = eraProgress(era, completedSet);

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs items={[{ label: '시대별 학습', to: '/eras' }, { label: era.name }]} />

      <PageHeader eyebrow={era.period} title={era.name} desc={era.desc}>
        <div className="mt-1.5 flex max-w-md items-center gap-3">
          <ProgressBar progress={p} label={`${era.name} 진도`} />
          <span className="text-sm text-muted-foreground tabular-nums">
            {p.done}/{p.total}
          </span>
        </div>
      </PageHeader>

      <ul className="flex flex-col gap-3">
        {era.topics.map((t) => {
          const done = completedSet.has(t.id);
          return (
            <li key={t.id} className={cn(cardClass, cardHoverClass, 'grid grid-cols-[1.75rem_minmax(0,1fr)] gap-4')}>
              <span
                aria-hidden="true"
                className={cn(
                  'grid size-7 place-items-center rounded-full border-2',
                  done ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500' : 'border-border',
                )}
              >
                {done && <Check className="size-4" strokeWidth={3} />}
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-semibold">
                    <Link to={`/topics/${t.id}`} className="after:absolute after:inset-0 after:rounded-xl">
                      {t.title}
                    </Link>
                  </h2>
                  {bookmarkSet.has(t.id) && (
                    <Bookmark className="size-4 fill-current text-red-700 dark:text-red-400" aria-label="북마크됨" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{t.summary}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <ImportanceBadge level={t.importance} />
                  <span>
                    핵심 {t.points.length} · 연표 {t.events.length} · 키워드 {t.terms.length}
                  </span>
                  {done && <span className="font-medium text-emerald-700 dark:text-emerald-400">학습 완료</span>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Pager
        label="시대 이동"
        prev={prev && { to: `/eras/${prev.id}`, caption: '이전 시대', title: prev.name }}
        next={next && { to: `/eras/${next.id}`, caption: '다음 시대', title: next.name }}
      />
    </div>
  );
}