import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { ArrowLeft, ArrowRight, BookOpen, Check, RotateCcw, Timer, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EXAM_SPECS } from '../data/exam';
import { buildQuizSet, formatTime, gradeForScore, gradeQuiz, type QuizItem, type QuizMode, type QuizSet } from '../lib/exam';
import { getTopic } from '../lib/selectors';
import { cardClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import type { ChoiceNo } from '../types';
import { Breadcrumbs } from '../components/breadcrumbs';
import { EmptyState } from '../components/primitives';
import { NotFoundPage } from './not-found-page';

const CHOICE_MARKS = ['①', '②', '③', '④', '⑤'] as const;
const EXAM_SECONDS = EXAM_SPECS.advanced.minutes * 60;

export function QuizPage() {
  const { setId = '' } = useParams();
  const [params] = useSearchParams();
  const mode: QuizMode = params.get('mode') === 'exam' ? 'exam' : 'study';
  // 세트·모드가 바뀌면 풀이 상태를 통째로 새로 시작
  return <QuizSession key={`${setId}:${mode}`} setId={setId} mode={mode} />;
}

function QuizSession({ setId, mode }: { setId: string; mode: QuizMode }) {
  const { state } = useStudy();
  // 오답 노트는 푸는 도중 줄어들면 안 되므로 시작 시점 목록으로 고정
  const [set] = useState(() => buildQuizSet(setId, state.wrongNotes));
  if (!set) return <NotFoundPage />;
  if (set.items.length === 0) {
    return (
      <EmptyState title="풀 문제가 없습니다.">
        <Link to="/practice" className="font-medium text-primary hover:underline">
          기출 연습으로 돌아가기
        </Link>
      </EmptyState>
    );
  }
  return <QuizRunner set={set} mode={set.exam ? mode : 'study'} />;
}

function QuizRunner({ set, mode }: { set: QuizSet; mode: QuizMode }) {
  const { dispatch } = useStudy();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ChoiceNo>>({});
  const [finished, setFinished] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deadline, setDeadline] = useState(() => Date.now() + EXAM_SECONDS * 1000);
  const [now, setNow] = useState(() => Date.now());
  const remaining = Math.max(0, Math.ceil((deadline - now) / 1000));

  const timed = mode === 'exam';
  const item = set.items[index];
  const answeredCount = set.items.filter((it) => answers[it.key]).length;
  const isLast = index === set.items.length - 1;

  const submit = useCallback(() => {
    const result = gradeQuiz(set.items, answers);
    if (set.exam && mode === 'exam') {
      dispatch({
        type: 'saveExamRecord',
        examId: set.exam.id,
        record: { score: result.score, correct: result.correct, total: result.total, takenAt: new Date().toISOString() },
      });
      dispatch({ type: 'syncWrongNotes', wrong: result.wrongKeys, right: result.rightKeys });
    }
    setFinished(true);
    setConfirming(false);
    window.scrollTo(0, 0);
  }, [set, answers, mode, dispatch]);

  // 인터벌 안에서 최신 답안으로 자동 제출하기 위해 ref로 보관
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  useEffect(() => {
    if (!timed || finished) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= deadline) submitRef.current();
    }, 1000);
    return () => window.clearInterval(id);
  }, [timed, finished, deadline]);

  const select = useCallback(
    (choice: ChoiceNo) => {
      if (mode === 'study') {
        if (answers[item.key]) return; // 연습 모드는 첫 선택으로 채점 확정
        const correct = choice === item.question.answer;
        dispatch({ type: 'syncWrongNotes', wrong: correct ? [] : [item.key], right: correct ? [item.key] : [] });
      }
      setAnswers((prev) => ({ ...prev, [item.key]: choice }));
    },
    [mode, answers, item, dispatch],
  );

  const go = useCallback(
    (next: number) => {
      setIndex(Math.min(set.items.length - 1, Math.max(0, next)));
      setConfirming(false);
    },
    [set.items.length],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  // 키보드: 1~5 선택, ←/→ 이동
  useEffect(() => {
    if (finished) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest('input, textarea, select')) return;
      if (e.key >= '1' && e.key <= '5') select(Number(e.key) as ChoiceNo);
      else if (e.key === 'ArrowRight') go(index + 1);
      else if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finished, select, go, index]);

  if (finished) {
    return (
      <QuizResultView
        set={set}
        mode={mode}
        answers={answers}
        elapsed={timed ? EXAM_SECONDS - remaining : null}
        onRetry={() => {
          setAnswers({});
          setIndex(0);
          setDeadline(Date.now() + EXAM_SECONDS * 1000);
          setNow(Date.now());
          setFinished(false);
        }}
      />
    );
  }

  const selected = answers[item.key];
  const reveal = mode === 'study' && selected !== undefined;
  const unanswered = set.items.length - answeredCount;

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs items={[{ label: '기출 연습', to: '/practice' }, { label: set.title }]} />

      <div className="sticky top-14 z-10 -mx-4 flex items-center justify-between gap-3 border-b bg-background/95 px-4 py-2.5 backdrop-blur md:top-16">
        <p className="text-sm font-semibold tabular-nums">
          {index + 1} <span className="font-normal text-muted-foreground">/ {set.items.length}</span>
          <span className="ml-3 font-normal text-muted-foreground">{answeredCount}문항 풂</span>
        </p>
        {timed ? (
          <p
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums',
              remaining < 600 && 'text-red-700 dark:text-red-400',
            )}
            aria-label={`남은 시간 ${formatTime(remaining)}`}
          >
            <Timer className="size-4" aria-hidden="true" />
            {formatTime(remaining)}
          </p>
        ) : (
          <span className="text-xs font-medium text-muted-foreground">연습 모드 · 바로 채점</span>
        )}
      </div>

      <QuestionView item={item} selected={selected} reveal={reveal} onSelect={select} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={() => go(index - 1)} disabled={index === 0}>
          <ArrowLeft aria-hidden="true" />
          이전
        </Button>
        {isLast ? (
          <Button onClick={() => (mode === 'exam' && unanswered > 0 ? setConfirming(true) : submit())}>
            {mode === 'exam' ? '제출하고 채점' : '결과 보기'}
          </Button>
        ) : (
          <Button onClick={() => go(index + 1)}>
            다음
            <ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>

      {confirming && (
        <div role="alertdialog" aria-labelledby="confirm-title" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
          <p id="confirm-title" className="text-sm">
            아직 <strong>{unanswered}문항</strong>을 풀지 않았습니다. 그대로 제출할까요?
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setConfirming(false)}>
              계속 풀기
            </Button>
            <Button size="sm" onClick={submit}>
              제출
            </Button>
          </div>
        </div>
      )}

      <section aria-labelledby="omr-title" className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="omr-title" className="text-sm font-semibold">
            문항 이동
          </h2>
          {!isLast && (
            <button
              type="button"
              onClick={() => {
                if (mode === 'exam' && unanswered > 0) {
                  go(set.items.length - 1);
                  setConfirming(true);
                } else submit();
              }}
              className="text-sm font-medium text-primary hover:underline"
            >
              {mode === 'exam' ? '바로 제출' : '그만 풀고 결과 보기'}
            </button>
          )}
        </div>
        <ol className="grid grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] gap-1.5">
          {set.items.map((it, i) => {
            const a = answers[it.key];
            const judged = mode === 'study' && a !== undefined;
            const ok = a === it.question.answer;
            return (
              <li key={it.key}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1}번${a ? ' 풂' : ''}`}
                  aria-current={i === index ? 'step' : undefined}
                  className={cn(
                    'h-9 w-full rounded-md border text-xs font-medium tabular-nums transition-colors hover:border-primary/60',
                    a && !judged && 'border-primary/40 bg-accent text-primary',
                    judged && ok && 'border-emerald-600/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
                    judged && !ok && 'border-red-600/40 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300',
                    i === index && 'ring-2 ring-primary ring-offset-1 ring-offset-background',
                  )}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        </ol>
        <p className="hidden text-xs text-muted-foreground md:block">키보드 1~5로 답을 고르고 ←/→로 이동할 수 있습니다.</p>
      </section>
    </div>
  );
}

function QuestionView({
  item,
  selected,
  reveal,
  onSelect,
}: {
  item: QuizItem;
  selected?: ChoiceNo;
  reveal: boolean;
  onSelect?: (choice: ChoiceNo) => void;
}) {
  const { question: q } = item;
  const topic = q.topicId ? getTopic(q.topicId) : undefined;
  const correct = selected === q.answer;

  return (
    <article className={cn(cardClass, 'flex flex-col gap-5')} aria-labelledby={`q-${item.key}`}>
      <header className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground">
          제{item.round}회 {q.no}번 유형 · {q.points}점
        </p>
        <h2 id={`q-${item.key}`} className="text-lg leading-snug font-semibold text-balance">
          {q.prompt}
        </h2>
      </header>

      {item.image && (
        <figure className="flex flex-col items-center gap-1.5">
          <picture>
            <source srcSet={`${import.meta.env.BASE_URL}exams/${item.image.file}.avif`} type="image/avif" />
            <img
              src={`${import.meta.env.BASE_URL}exams/${item.image.file}.webp`}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-80 w-auto max-w-full rounded-lg border object-contain"
            />
          </picture>
          <figcaption className="text-xs text-muted-foreground">
            <a href={item.image.href} target="_blank" rel="noreferrer" className="hover:underline">
              사진: {item.image.credit}
            </a>
          </figcaption>
        </figure>
      )}

      {q.source && (
        <div className="flex flex-col gap-2 rounded-lg border bg-muted/50 px-4 py-3.5 text-[0.95rem] leading-relaxed">
          {q.source.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      <div role="radiogroup" aria-labelledby={`q-${item.key}`} className="flex flex-col gap-2">
        {q.choices.map((text, i) => {
          const n = (i + 1) as ChoiceNo;
          const isSelected = selected === n;
          const isAnswer = q.answer === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={!onSelect || reveal}
              onClick={() => onSelect?.(n)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors disabled:cursor-default',
                !reveal && 'hover:border-primary/60 hover:bg-accent',
                !reveal && isSelected && 'border-primary bg-accent font-medium',
                reveal && isAnswer && 'border-emerald-600 bg-emerald-50 font-medium dark:bg-emerald-950/40',
                reveal && isSelected && !isAnswer && 'border-red-600 bg-red-50 dark:bg-red-950/40',
              )}
            >
              <span className="shrink-0 font-semibold tabular-nums" aria-hidden="true">
                {CHOICE_MARKS[i]}
              </span>
              <span className="min-w-0 flex-1">{text}</span>
              {reveal && isAnswer && <Check className="size-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="정답" />}
              {reveal && isSelected && !isAnswer && <X className="size-5 shrink-0 text-red-700 dark:text-red-400" aria-label="내 답" />}
            </button>
          );
        })}
      </div>

      {reveal && (
        <div
          className={cn(
            'flex flex-col gap-2 rounded-lg border-l-4 bg-muted/50 px-4 py-3.5',
            correct ? 'border-emerald-600' : 'border-red-600',
          )}
          aria-live="polite"
        >
          <p className={cn('font-semibold', correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400')}>
            {selected === undefined ? `미응답 · 정답 ${CHOICE_MARKS[q.answer - 1]}` : correct ? '정답입니다' : `오답 · 정답 ${CHOICE_MARKS[q.answer - 1]}`}
          </p>
          <p className="text-sm leading-relaxed">{q.explanation}</p>
          {topic && (
            <Link to={`/topics/${topic.id}`} className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline">
              <BookOpen className="size-4" aria-hidden="true" />
              개념 다시 보기 · {topic.eraName} {topic.title}
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

function QuizResultView({
  set,
  mode,
  answers,
  elapsed,
  onRetry,
}: {
  set: QuizSet;
  mode: QuizMode;
  answers: Record<string, ChoiceNo>;
  elapsed: number | null;
  onRetry: () => void;
}) {
  const [onlyWrong, setOnlyWrong] = useState(true);
  // 연습 모드는 푼 문항만 채점, 실전은 미응답도 오답
  const items = mode === 'study' ? set.items.filter((it) => answers[it.key]) : set.items;
  const result = gradeQuiz(items, answers);
  const wrong = new Set(result.wrongKeys);
  const shown = onlyWrong ? items.filter((it) => wrong.has(it.key)) : items;
  const isFullExam = Boolean(set.exam) && mode === 'exam';
  const grade = isFullExam ? gradeForScore(result.score) : null;

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs items={[{ label: '기출 연습', to: '/practice' }, { label: set.title }]} />

      <section className="grid gap-5 rounded-xl bg-primary p-6 text-primary-foreground sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
        <div className="flex flex-col">
          <span className="text-sm opacity-80">{set.title} 결과</span>
          {isFullExam ? (
            <strong className="text-5xl font-bold tabular-nums">
              {result.score}
              <span className="text-2xl font-semibold">점</span>
            </strong>
          ) : (
            <strong className="text-5xl font-bold tabular-nums">
              {result.correct}
              <span className="text-2xl font-semibold"> / {result.total}</span>
            </strong>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {isFullExam && <li>{grade ? `심화 ${grade}급 인정 점수` : '60점 미만 · 급수 미인정'}</li>}
          <li className="tabular-nums">
            정답 {result.correct}문항 · 오답 {result.total - result.correct}문항
          </li>
          {elapsed !== null && <li className="tabular-nums">풀이 시간 {formatTime(elapsed)}</li>}
          {isFullExam && grade !== 1 && <li className="tabular-nums">1급까지 {Math.max(0, 80 - result.score)}점</li>}
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onRetry}>
          <RotateCcw aria-hidden="true" />
          다시 풀기
        </Button>
        <Link to="/practice/wrong?mode=study" className={buttonVariants({ variant: 'outline' })}>
          오답 노트
        </Link>
        <Link to="/practice" className={buttonVariants({ variant: 'ghost' })}>
          목록으로
        </Link>
      </div>

      <section aria-labelledby="review-title" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="review-title" className="font-semibold">
            문항별 해설
          </h2>
          <div role="group" aria-label="해설 범위" className="inline-flex rounded-lg border p-0.5 text-sm">
            {[
              { value: true, label: `틀린 문제 ${result.total - result.correct}` },
              { value: false, label: `전체 ${result.total}` },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                aria-pressed={onlyWrong === opt.value}
                onClick={() => setOnlyWrong(opt.value)}
                className={cn('rounded-md px-3 py-1.5 tabular-nums', onlyWrong === opt.value && 'bg-accent font-semibold text-foreground')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        {shown.length === 0 ? (
          <EmptyState title={onlyWrong ? '틀린 문제가 없습니다.' : '푼 문제가 없습니다.'} />
        ) : (
          <ul className="flex flex-col gap-4">
            {shown.map((it) => (
              <li key={it.key}>
                <QuestionView item={it} selected={answers[it.key]} reveal />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
