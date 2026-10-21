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
  | 'contemporary';

/** 1: 기본, 2: 자주 나옴, 3: 매회 출제 수준 */
export type Importance = 1 | 2 | 3;

export interface KeyTerm {
  term: string;
  desc: string;
}

export interface TimelineEvent {
  year: string;
  text: string;
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  importance: Importance;
  points: string[];
  events: TimelineEvent[];
  terms: KeyTerm[];
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