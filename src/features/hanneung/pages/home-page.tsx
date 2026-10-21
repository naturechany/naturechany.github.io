import { Link } from 'react-router';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ERAS } from '../data/eras';
import { EXAM_SPECS } from '../data/exam';
import { daysUntil, formatDday, formatKoreanDate } from '../lib/date';
import { eraProgress, getTopic, nextTopic, overallProgress } from '../lib/selectors';
import { cardClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import { ProgressBar } from '../components/primitives';

export function HomePage() {
  const { state, completedSet } = useStudy();
  const spec = EXAM_SPECS[state.examLevel];
  const goal = spec.grades.find((g) => g.grade === state.targetGrade) ?? spec.grades[0];
  const dday = daysUntil(state.examDate);
  const overall = overallProgress(completedSet);
  const next = nextTopic(completedSet, state.lastTopicId);
  const bookmarks = state.bookmarks.map(getTopic).filter((t) => t !== undefined).slice(0, 4);

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-5 md:grid-cols-[minmax(0,1fr)_240px] md:gap-8">
        <div className="flex flex-col justify-center gap-3">
          <p className="text-xs font-semibold tracking-wide text-primary">
            {spec.label} {goal.grade}급 목표 · {goal.minScore}점 이상
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">한 단원씩, 시대 순서대로.</h1>
          <p className="text-muted-foreground">
            전체 {overall.total}개 단원 중 <strong className="text-foreground">{overall.done}개</strong>를 마쳤습니다.
          </p>
          <ProgressBar progress={overall} label="전체 학습 진도" className="mt-1 max-w-md" />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-primary p-5 text-primary-foreground md:flex-col md:items-start md:justify-center">
          {dday === null ? (
            <>
              <CalendarDays className="size-6" aria-hidden="true" />
              <p className="text-sm">시험일을 정하면 남은 날짜를 보여 드려요.</p>
              <Link
                to="/my"
                className={cn(buttonVariants({ variant: 'outline' }), 'border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground')}
              >
                시험일 설정
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm opacity-80">시험까지</span>
              <strong className="text-4xl font-bold tabular-nums">{formatDday(dday)}</strong>
              <span className="text-sm opacity-80">{formatKoreanDate(state.examDate!)}</span>
            </>
          )}
        </div>
      </section>

      {next && (
        <section className={cn(cardClass, 'flex flex-wrap items-center justify-between gap-5')} aria-labelledby="continue-title">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-1">
            <span className="text-xs font-semibold tracking-wide text-primary">이어서 학습 · {next.eraName}</span>
            <h2 id="continue-title" className="text-xl font-semibold">
              {next.title}
            </h2>
            <p className="text-sm text-muted-foreground">{next.summary}</p>
          </div>
          <Link to={`/topics/${next.id}`} className={buttonVariants({ size: 'lg' })}>
            학습 시작
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      )}

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <section aria-labelledby="era-progress-title" className="flex min-w-0 flex-col gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="era-progress-title" className="font-semibold">
              시대별 진도
            </h2>
            <Link to="/eras" className="text-sm font-medium text-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <ul className="divide-y rounded-xl border bg-card">
            {ERAS.map((era) => {
              const p = eraProgress(era, completedSet);
              return (
                <li key={era.id}>
                  <Link
                    to={`/eras/${era.id}`}
                    className="group grid grid-cols-[7rem_minmax(0,1fr)_2.5rem] items-center gap-3 px-4 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_2.75rem]"
                  >
                    <span className="text-sm font-medium group-hover:text-primary">{era.name}</span>
                    <ProgressBar progress={p} label={`${era.name} 진도`} />
                    <span className="text-right text-xs text-muted-foreground tabular-nums">
                      {p.done}/{p.total}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex min-w-0 flex-col gap-8">
          <section aria-labelledby="grade-title" className="flex flex-col gap-3">
            <h2 id="grade-title" className="font-semibold">
              급수 인정 기준
            </h2>
            <div className="overflow-x-auto rounded-xl border bg-card">
              <table className="w-full text-sm">
                <caption className="sr-only">한국사능력검정시험 급수별 인정 점수</caption>
                <thead className="bg-muted text-xs text-muted-foreground">
                  <tr>
                    {['구분', '급수', '인정 점수', '시간'].map((h) => (
                      <th key={h} scope="col" className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(EXAM_SPECS).flatMap((s) =>
                    s.grades.map((g, i) => {
                      const isGoal = s.level === state.examLevel && g.grade === goal.grade;
                      return (
                        <tr key={`${s.level}-${g.grade}`} className="border-t">
                          {i === 0 && (
                            <th scope="rowgroup" rowSpan={s.grades.length} className="border-r px-4 py-2.5 text-left align-top font-semibold">
                              {s.label}
                            </th>
                          )}
                          <td className={cn('px-4 py-2.5 whitespace-nowrap', isGoal && 'bg-accent font-semibold text-primary')}>{g.grade}급</td>
                          <td className={cn('px-4 py-2.5 whitespace-nowrap tabular-nums', isGoal && 'bg-accent font-semibold text-primary')}>
                            {g.minScore}점 이상
                          </td>
                          {i === 0 && (
                            <td rowSpan={s.grades.length} className="border-l px-4 py-2.5 align-top whitespace-nowrap tabular-nums">
                              {s.minutes}분 · {s.questions}문항
                            </td>
                          )}
                        </tr>
                      );
                    }),
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">100점 만점 기준. 시행 공고에서 최종 확인하세요.</p>
          </section>

          <section aria-labelledby="bookmark-title" className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="bookmark-title" className="font-semibold">
                북마크한 단원
              </h2>
              {state.bookmarks.length > 0 && (
                <Link to="/my" className="text-sm font-medium text-primary hover:underline">
                  모두 보기
                </Link>
              )}
            </div>
            {bookmarks.length === 0 ? (
              <p className="text-sm text-muted-foreground">단원 화면에서 북마크하면 여기 모입니다.</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {bookmarks.map((t) => (
                  <li key={t.id}>
                    <Link to={`/topics/${t.id}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}