import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Bookmark, Check, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAdjacentTopics, getTopic } from '../lib/selectors';
import { cardClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import { Breadcrumbs } from '../components/breadcrumbs';
import { CompareTable } from '../components/compare-table';
import { Pager } from '../components/pager';
import { ImportanceBadge } from '../components/primitives';
import { NotFoundPage } from './not-found-page';

export function TopicPage() {
  const { topicId = '' } = useParams();
  const { completedSet, bookmarkSet, dispatch } = useStudy();
  const topic = getTopic(topicId);

  // 외부 저장소(localStorage)에 "마지막 학습 단원"을 동기화
  useEffect(() => {
    if (topic) dispatch({ type: 'visit', id: topic.id });
  }, [topic, dispatch]);

  if (!topic) return <NotFoundPage />;

  const { prev, next } = getAdjacentTopics(topic.id);
  const done = completedSet.has(topic.id);
  const bookmarked = bookmarkSet.has(topic.id);

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: '시대별 학습', to: '/eras' },
          { label: topic.eraName, to: `/eras/${topic.eraId}` },
          { label: topic.title },
        ]}
      />

      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
          <ImportanceBadge level={topic.importance} />
          <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{topic.title}</h1>
          <p className="max-w-prose text-muted-foreground">{topic.summary}</p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto [&>button]:flex-1 sm:[&>button]:flex-none">
          <Button
            variant={bookmarked ? 'secondary' : 'outline'}
            size="lg"
            aria-pressed={bookmarked}
            onClick={() => dispatch({ type: 'toggleBookmark', id: topic.id })}
          >
            <Bookmark className={cn(bookmarked && 'fill-current')} aria-hidden="true" />
            {bookmarked ? '북마크됨' : '북마크'}
          </Button>
          <Button
            size="lg"
            aria-pressed={done}
            onClick={() => dispatch({ type: 'toggleComplete', id: topic.id })}
            className={cn(done && 'bg-emerald-600 text-white hover:bg-emerald-600/90 dark:bg-emerald-500 dark:text-emerald-950')}
          >
            <Check aria-hidden="true" />
            {done ? '학습 완료' : '학습 완료로 표시'}
          </Button>
        </div>
      </header>

      <div className="grid items-start gap-4 md:grid-cols-2">
        <section
          className={cn(cardClass, 'flex min-w-0 flex-col gap-3', topic.events.length === 0 && 'md:col-span-2')}
          aria-labelledby="points-title"
        >
          <h2 id="points-title" className="font-semibold">
            핵심 정리
          </h2>
          <ul className="flex flex-col gap-2.5">
            {topic.points.map((p) => (
              <li key={p} className="relative pl-4.5 before:absolute before:top-[0.65em] before:left-0.5 before:size-1.5 before:rotate-45 before:bg-primary">
                {p}
              </li>
            ))}
          </ul>
        </section>

        {topic.events.length > 0 && (
          <section className={cn(cardClass, 'flex min-w-0 flex-col gap-3')} aria-labelledby="events-title">
            <h2 id="events-title" className="font-semibold">
              연표
            </h2>
            <ol className="divide-y divide-dashed">
              {topic.events.map((e) => (
                <li key={`${e.year}-${e.text}`} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 py-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
                  <span className="font-bold text-primary tabular-nums">{e.year}</span>
                  <span className="flex flex-col gap-0.5">
                    <span>{e.text}</span>
                    {e.ruler && <span className="text-xs font-medium text-muted-foreground">{e.ruler}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {topic.traps && topic.traps.length > 0 && (
          <section
            className="flex min-w-0 flex-col gap-3 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950 sm:p-6 md:col-span-2 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
            aria-labelledby="traps-title"
          >
            <h2 id="traps-title" className="flex items-center gap-2 font-semibold">
              <TriangleAlert className="size-4.5" aria-hidden="true" />
              헷갈리는 포인트
            </h2>
            <ul className="flex flex-col gap-2">
              {topic.traps.map((t) => (
                <li key={t} className="relative pl-4.5 before:absolute before:top-[0.65em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-amber-600 dark:before:bg-amber-400">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {topic.tables && topic.tables.length > 0 && (
          <section className={cn(cardClass, 'flex min-w-0 flex-col gap-4 md:col-span-2')} aria-labelledby="tables-title">
            <h2 id="tables-title" className="font-semibold">
              비교 정리
            </h2>
            {topic.tables.map((t) => (
              <CompareTable key={t.title} table={t} />
            ))}
          </section>
        )}

        <section className={cn(cardClass, 'flex min-w-0 flex-col gap-3 md:col-span-2')} aria-labelledby="terms-title">
          <h2 id="terms-title" className="font-semibold">
            핵심 키워드
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topic.terms.map((t) => (
              <div key={t.term} className="rounded-lg bg-muted px-4 py-3.5">
                <dt className="font-semibold">{t.term}</dt>
                <dd className="text-sm text-muted-foreground">{t.desc}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <Pager
        label="단원 이동"
        prev={prev && { to: `/topics/${prev.id}`, caption: `이전 단원 · ${prev.eraName}`, title: prev.title }}
        next={next && { to: `/topics/${next.id}`, caption: `다음 단원 · ${next.eraName}`, title: next.title }}
      />
    </div>
  );
}