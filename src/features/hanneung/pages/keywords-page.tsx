import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ERAS } from '../data/eras';
import { ALL_TERMS, searchTerms } from '../lib/selectors';
import { cardClass } from '../lib/styles';
import type { EraId } from '../types';
import { EmptyState, PageHeader } from '../components/primitives';

const FILTERS: { id: EraId | 'all'; name: string }[] = [{ id: 'all', name: '전체' }, ...ERAS];

export function KeywordsPage() {
  const [query, setQuery] = useState('');
  const [eraId, setEraId] = useState<EraId | 'all'>('all');
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => searchTerms(deferredQuery, eraId), [deferredQuery, eraId]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="키워드 사전" desc={`인물·제도·사건 ${ALL_TERMS.length}개를 검색하고 해당 단원으로 바로 이동합니다.`} />

      <form role="search" className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="kw-query" className="sr-only">
          키워드 검색
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="kw-query"
            type="search"
            autoComplete="off"
            placeholder="예: 진대법, 신간회, 균역법"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-lg border border-input bg-background pr-4 pl-10 text-base outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <fieldset className="flex flex-wrap gap-1.5">
          <legend className="sr-only">시대 필터</legend>
          {FILTERS.map((f) => {
            const active = eraId === f.id;
            return (
              <label
                key={f.id}
                className={cn(
                  'relative inline-flex h-9 cursor-pointer items-center rounded-full border px-3 text-sm transition-colors has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50',
                  active ? 'border-primary bg-primary font-semibold text-primary-foreground' : 'bg-background hover:bg-accent',
                )}
              >
                <input
                  id={`era-${f.id}`}
                  type="radio"
                  name="era"
                  value={f.id}
                  checked={active}
                  onChange={() => setEraId(f.id)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                {f.name}
              </label>
            );
          })}
        </fieldset>
      </form>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {results.length}개 결과
      </p>

      {results.length === 0 ? (
        <EmptyState title="일치하는 키워드가 없습니다.">
          <p>철자를 확인하거나 시대 필터를 ‘전체’로 바꿔 보세요.</p>
        </EmptyState>
      ) : (
        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <li key={`${t.topicId}-${t.term}`} className={cn(cardClass, 'flex flex-col gap-1.5 p-4.5 sm:p-4.5')}>
              <h2 className="font-semibold">{t.term}</h2>
              <p className="flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <Link to={`/topics/${t.topicId}`} className="mt-1 text-sm font-medium text-primary hover:underline">
                {t.eraName} · {t.topicTitle}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}