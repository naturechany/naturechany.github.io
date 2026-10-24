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
}