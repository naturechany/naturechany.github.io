import { MOCK_EXAMS } from '../data/exams';
import { EXAM_IMAGES } from '../data/exam-images';
import { EXAM_SPECS } from '../data/exam';
import { ERAS } from '../data/eras';
import type { ChoiceNo, EraId, ExamImage, ExamQuestion, MockExam } from '../types';
import { getTopic } from './selectors';

/** 화면에서 다루는 문항 단위: 어느 회차의 몇 번인지 함께 들고 다닌다 */
export interface QuizItem {
  key: string;
  examId: string;
  round: number;
  question: ExamQuestion;
  image?: ExamImage;
}

export type QuizMode = 'exam' | 'study';

export interface QuizSet {
  id: string;
  title: string;
  items: QuizItem[];
  /** 실전 회차만 시간 제한과 점수 기록이 있다 */
  exam?: MockExam;
}

export const questionKey = (examId: string, no: number) => `${examId}:${no}`;

const toItems = (exam: MockExam): QuizItem[] =>
  exam.questions.map((question) => {
    const key = questionKey(exam.id, question.no);
    return { key, examId: exam.id, round: exam.round, question, image: EXAM_IMAGES[key] };
  });

export const ALL_ITEMS: QuizItem[] = MOCK_EXAMS.flatMap(toItems);
const ITEM_INDEX = new Map(ALL_ITEMS.map((it) => [it.key, it]));

export const getExam = (id: string) => MOCK_EXAMS.find((e) => e.id === id);

export const eraOf = (item: QuizItem): EraId | undefined =>
  item.question.topicId ? getTopic(item.question.topicId)?.eraId : undefined;

/** 시대별 문항 수 (문항이 있는 시대만) */
export const ERA_COUNTS = ERAS.map((era) => ({
  era,
  count: ALL_ITEMS.filter((it) => eraOf(it) === era.id).length,
})).filter((e) => e.count > 0);

/** setId: 회차 id | `era-${eraId}` | 'wrong' */
export function buildQuizSet(setId: string, wrongNotes: string[]): QuizSet | undefined {
  const exam = getExam(setId);
  if (exam) return { id: exam.id, title: `제${exam.round}회 기출 변형`, items: toItems(exam), exam };

  if (setId === 'wrong') {
    const items = wrongNotes.map((k) => ITEM_INDEX.get(k)).filter((it) => it !== undefined);
    return { id: setId, title: '오답 노트', items };
  }

  if (setId.startsWith('era-')) {
    const eraId = setId.slice(4);
    const era = ERAS.find((e) => e.id === eraId);
    if (!era) return undefined;
    // 시대 안에서는 회차 무관하게 시대 흐름(단원 순서)대로 푼다
    const topicOrder = new Map(era.topics.map((t, i) => [t.id, i]));
    const items = ALL_ITEMS.filter((it) => eraOf(it) === era.id).sort(
      (a, b) => (topicOrder.get(a.question.topicId!) ?? 0) - (topicOrder.get(b.question.topicId!) ?? 0) || b.round - a.round,
    );
    return { id: setId, title: `${era.name} 집중 연습`, items };
  }
  return undefined;
}

export interface QuizResult {
  score: number;
  maxScore: number;
  correct: number;
  total: number;
  wrongKeys: string[];
  rightKeys: string[];
}

export function gradeQuiz(items: QuizItem[], answers: Record<string, ChoiceNo>): QuizResult {
  const result: QuizResult = { score: 0, maxScore: 0, correct: 0, total: items.length, wrongKeys: [], rightKeys: [] };
  for (const { key, question } of items) {
    result.maxScore += question.points;
    if (answers[key] === question.answer) {
      result.score += question.points;
      result.correct += 1;
      result.rightKeys.push(key);
    } else {
      result.wrongKeys.push(key);
    }
  }
  return result;
}

/** 심화 기준 인정 급수. 60점 미만이면 null */
export const gradeForScore = (score: number) =>
  EXAM_SPECS.advanced.grades.find((g) => score >= g.minScore)?.grade ?? null;

export const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};
