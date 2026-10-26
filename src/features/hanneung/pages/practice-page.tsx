import { Link } from 'react-router';
import { ArrowRight, ExternalLink, NotebookPen, Timer } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EXAM_SPECS } from '../data/exam';
import { MOCK_EXAMS, OFFICIAL_ARCHIVE_URL } from '../data/exams';
import { formatKoreanDate } from '../lib/date';
import { ERA_COUNTS, gradeForScore } from '../lib/exam';
import { cardClass, cardHoverClass } from '../lib/styles';
import { useStudy } from '../store/study-context';
import { PageHeader } from '../components/primitives';

export function PracticePage() {
  const { state } = useStudy();
  const spec = EXAM_SPECS.advanced;

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="기출 연습"
        desc={`최근 심화 회차의 문항별 출제 주제를 그대로 따라 만든 변형 문제입니다. 실전처럼 ${spec.minutes}분 동안 ${spec.questions}문항을 풀거나, 한 문제씩 풀며 해설을 바로 확인하세요.`}
      />

      <section aria-labelledby="mock-title" className="flex flex-col gap-3">
        <h2 id="mock-title" className="font-semibold">
          회차별 모의고사
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {MOCK_EXAMS.map((exam) => {
            const record = state.examRecords[exam.id];
            const grade = record ? gradeForScore(record.score) : null;
            return (
              <li key={exam.id} className={cn(cardClass, 'flex flex-col gap-4')}>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold tracking-wide text-primary">{formatKoreanDate(exam.heldOn)} 시행</span>
                  <h3 className="text-lg font-bold">제{exam.round}회 기출 변형</h3>
                  {record ? (
                    <p className="text-sm text-muted-foreground tabular-nums">
                      최근 <strong className="text-foreground">{record.score}점</strong>
                      {grade ? ` · ${grade}급` : ' · 불합격'} · 최고 {record.bestScore}점
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">아직 응시 기록이 없습니다.</p>
                  )}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Link to={`/practice/${exam.id}?mode=exam`} className={buttonVariants({ size: 'sm' })}>
                    <Timer aria-hidden="true" />
                    실전 {spec.minutes}분
                  </Link>
                  <Link to={`/practice/${exam.id}?mode=study`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                    한 문제씩
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="era-title" className="flex min-w-0 flex-col gap-3">
          <h2 id="era-title" className="font-semibold">
            시대별 집중 연습
          </h2>
          <p className="text-sm text-muted-foreground">세 회차의 문항을 시대별로 모아 단원 순서대로 풉니다. 바로 채점하고 해설을 보여 줍니다.</p>
          <ul className="flex flex-wrap gap-2">
            {ERA_COUNTS.map(({ era, count }) => (
              <li key={era.id}>
                <Link
                  to={`/practice/era-${era.id}?mode=study`}
                  className="inline-flex h-10 items-center gap-2 rounded-full border bg-background px-4 text-sm transition-colors hover:border-primary/60 hover:bg-accent"
                >
                  {era.name}
                  <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Link
          to="/practice/wrong?mode=study"
          aria-disabled={state.wrongNotes.length === 0}
          className={cn(
            cardClass,
            cardHoverClass,
            'flex items-center gap-4',
            state.wrongNotes.length === 0 && 'pointer-events-none opacity-60',
          )}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-primary" aria-hidden="true">
            <NotebookPen className="size-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <strong className="font-semibold">오답 노트</strong>
            <span className="text-sm text-muted-foreground">
              {state.wrongNotes.length === 0 ? '틀린 문제가 여기 모입니다.' : `${state.wrongNotes.length}문항 다시 풀기`}
            </span>
          </span>
          {state.wrongNotes.length > 0 && <ArrowRight className="size-5 text-muted-foreground" aria-hidden="true" />}
        </Link>
      </div>

      <aside className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">
        <p className="mb-1.5 font-semibold text-foreground">문항 출처 안내</p>
        <p>
          각 문항은 같은 번호의 실제 기출 문항이 다룬 주제와 정답 논리를 따르되, 원문 저작권을 지키기 위해 자료와 선지를 새로 썼습니다. 유물·유적 사진은 위키미디어 공용의 자유 라이선스 사진으로 대신했고, 사진마다 저작자와 출처를 밝혔습니다. 원본 문제지와 정답표는 국사편찬위원회 자료실에서 받을 수 있습니다.
        </p>
        <a
          href={OFFICIAL_ARCHIVE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          한국사능력검정시험 기출 자료실
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </aside>
    </div>
  );
}
