import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EXAM_SPECS } from '../data/exam';
import { getTopic, overallProgress } from '../lib/selectors';
import { cardClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import type { ExamLevel } from '../types';
import { EmptyState, PageHeader, ProgressBar } from '../components/primitives';

const inputClass =
  'h-11 w-full rounded-lg border border-input bg-background px-3.5 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function MyPage() {
  const { state, dispatch, completedSet } = useStudy();
  const [level, setLevel] = useState<ExamLevel>(state.examLevel);
  const [grade, setGrade] = useState(state.targetGrade);
  const [date, setDate] = useState(state.examDate ?? '');
  const [confirmReset, setConfirmReset] = useState(false);

  const grades = EXAM_SPECS[level].grades;
  const overall = overallProgress(completedSet);
  const bookmarks = state.bookmarks.map(getTopic).filter((t) => t !== undefined);

  const onLevelChange = (next: ExamLevel) => {
    setLevel(next);
    setGrade(EXAM_SPECS[next].grades[0].grade); // 구분이 바뀌면 급수 범위도 바뀜
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'setExam', level, grade, date: date || null });
    toast.success('목표를 저장했습니다.');
  };

  const onReset = () => {
    dispatch({ type: 'reset' });
    setLevel('advanced');
    setGrade(1);
    setDate('');
    setConfirmReset(false);
    toast('학습 기록을 초기화했습니다.');
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="내 학습" desc="목표와 시험일을 정하고, 진도와 북마크를 관리합니다." />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section className={cn(cardClass, 'flex min-w-0 flex-col gap-4')} aria-labelledby="goal-title">
          <h2 id="goal-title" className="font-semibold">
            목표 설정
          </h2>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <fieldset className="flex flex-col gap-1.5">
              <legend className="mb-1.5 text-sm font-semibold">시험 구분</legend>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {Object.values(EXAM_SPECS).map((s) => (
                  <label key={s.level} htmlFor={`level-${s.level}`} className="inline-flex min-h-10 cursor-pointer items-center gap-2">
                    <input
                      id={`level-${s.level}`}
                      type="radio"
                      name="level"
                      checked={level === s.level}
                      onChange={() => onLevelChange(s.level)}
                      className="size-4.5 accent-primary"
                    />
                    {s.label} ({s.grades[0].grade}~{s.grades[s.grades.length - 1].grade}급)
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="goal-grade" className="text-sm font-semibold">
                목표 급수
              </label>
              <select id="goal-grade" className={inputClass} value={grade} onChange={(e) => setGrade(Number(e.target.value))}>
                {grades.map((g) => (
                  <option key={g.grade} value={g.grade}>
                    {g.grade}급 ({g.minScore}점 이상)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="exam-date" className="text-sm font-semibold">
                시험일
              </label>
              <input id="exam-date" type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">응시할 회차의 시험일을 입력하면 홈에 D-day가 표시됩니다.</p>
            </div>

            <div>
              <Button type="submit" size="lg">
                저장
              </Button>
            </div>
          </form>
        </section>

        <section className={cn(cardClass, 'flex min-w-0 flex-col gap-4')} aria-labelledby="progress-title">
          <h2 id="progress-title" className="font-semibold">
            학습 현황
          </h2>
          <dl className="grid grid-cols-3 gap-3">
            {[
              { label: '완료한 단원', value: overall.done, unit: `/${overall.total}` },
              { label: '진도율', value: Math.round(overall.ratio * 100), unit: '%' },
              { label: '북마크', value: state.bookmarks.length, unit: '' },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-3xl font-bold tabular-nums">
                  {s.value}
                  {s.unit && <small className="ml-0.5 text-sm font-medium text-muted-foreground">{s.unit}</small>}
                </dd>
              </div>
            ))}
          </dl>
          <ProgressBar progress={overall} label="전체 학습 진도" />

          <div className="mt-1 border-t pt-4">
            {confirmReset ? (
              <div role="alertdialog" aria-labelledby="reset-q" className="flex flex-col gap-3 text-sm">
                <p id="reset-q">완료 기록, 북마크, 목표 설정이 모두 지워집니다. 초기화할까요?</p>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={onReset}>
                    초기화
                  </Button>
                  <Button variant="outline" onClick={() => setConfirmReset(false)}>
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setConfirmReset(true)}>
                학습 기록 초기화
              </Button>
            )}
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-3" aria-labelledby="bm-title">
        <h2 id="bm-title" className="font-semibold">
          북마크한 단원
        </h2>
        {bookmarks.length === 0 ? (
          <EmptyState title="아직 북마크한 단원이 없습니다.">
            <p>
              <Link to="/eras" className="font-medium text-primary hover:underline">
                시대별 학습
              </Link>
              에서 다시 볼 단원을 북마크하세요.
            </p>
          </EmptyState>
        ) : (
          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((t) => (
              <li key={t.id} className={cn(cardClass, 'flex flex-col gap-1.5 p-4.5 sm:p-4.5')}>
                <span className="text-xs text-muted-foreground">{t.eraName}</span>
                <h3 className="font-semibold">
                  <Link to={`/topics/${t.id}`} className="after:absolute after:inset-0 after:rounded-xl hover:text-primary">
                    {t.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{t.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}