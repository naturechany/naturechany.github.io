export type EraId =
  | 'prehistory'
  | 'gojoseon'
  | 'three-kingdoms'
  | 'north-south'
  | 'goryeo'
  | 'joseon-early'
  | 'joseon-late'
  | 'modern'
  | 'colonial'
  | 'contemporary'
  | 'themes';

/** 1: 기본, 2: 자주 나옴, 3: 매회 출제 수준 */
export type Importance = 1 | 2 | 3;

export interface KeyTerm {
  term: string;
  desc: string;
}

export interface TimelineEvent {
  year: string;
  /** 당시 왕·정부·통치 시기 (예: 장수왕, 박정희 정부, 문화 통치기) */
  ruler?: string;
  text: string;
}

/** 재위·집권 기간. 연도는 숫자(기원전은 음수), 월이 필요하면 소수(1948.08 = 1948년 8월) */
export interface Ruler {
  /** 같은 시대에 여러 나라가 있을 때 구분(고구려·백제·신라 등) */
  dynasty?: string;
  name: string;
  /** 대수 (예: 20대, 1~3대 대통령) */
  order?: string;
  /** 본문에서 다르게 부르는 이름(예: 이승만 정부 → 이승만) */
  aliases?: string[];
  start: number;
  end: number;
  summary: string;
}

/** 비교 정리표. rows의 각 행 길이는 columns 길이와 같아야 한다 */
export interface CompareTable {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  importance: Importance;
  points: string[];
  events: TimelineEvent[];
  terms: KeyTerm[];
  /** 1급 변별용: 자주 틀리는 구분·함정 */
  traps?: string[];
  tables?: CompareTable[];
}

export interface Era {
  id: EraId;
  name: string;
  period: string;
  desc: string;
  topics: Topic[];
}

/** 정규화된 토픽: 소속 시대 정보 포함 */
export interface TopicRef extends Topic {
  eraId: EraId;
  eraName: string;
  eraIndex: number;
}

export type ExamLevel = 'advanced' | 'basic';

export interface StudyState {
  completed: string[];
  bookmarks: string[];
  examLevel: ExamLevel;
  targetGrade: number;
  examDate: string | null; // yyyy-mm-dd
  lastTopicId: string | null;
  /** 모의고사 id → 최근 응시 기록 */
  examRecords: Record<string, ExamRecord>;
  /** 오답 노트: `${examId}:${no}` */
  wrongNotes: string[];
}
export type ChoiceNo = 1 | 2 | 3 | 4 | 5;

/** 기출 변형 문항. 실제 시험처럼 1·2·3점 배점, 한 회차 합계 100점 */
export interface ExamQuestion {
  no: number;
  points: 1 | 2 | 3;
  /** 연결 단원 — 해설에서 개념 학습으로 이동 */
  topicId?: string;
  prompt: string;
  /** 제시 자료(사료·대화·연표 등). 한 줄이 한 문단 */
  source?: string[];
  choices: [string, string, string, string, string];
  answer: ChoiceNo;
  explanation: string;
}

/** 문항 자료 사진 (public/exams/) */
export interface ExamImage {
  /** 확장자 없는 파일명 — .avif와 .webp가 함께 있다 */
  file: string;
  width: number;
  height: number;
  alt: string;
  /** 저작자 · 라이선스 */
  credit: string;
  /** 원본 출처 페이지 */
  href: string;
}

export interface MockExam {
  id: string;
  /** 출제 경향을 따온 실제 회차 */
  round: number;
  heldOn: string; // yyyy-mm-dd
  questions: ExamQuestion[];
}

export interface ExamRecord {
  score: number;
  bestScore: number;
  correct: number;
  total: number;
  takenAt: string; // ISO
}
