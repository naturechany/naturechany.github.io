import { ERAS } from '../data/eras';
import type { Era, EraId, KeyTerm, TopicRef } from '../types';

// 정적 데이터이므로 모듈 로드 시 1회 정규화
export const ALL_TOPICS: TopicRef[] = ERAS.flatMap((era, eraIndex) =>
  era.topics.map((t) => ({ ...t, eraId: era.id, eraName: era.name, eraIndex })),
);

const TOPIC_INDEX = new Map(ALL_TOPICS.map((t, i) => [t.id, i]));
const ERA_INDEX = new Map(ERAS.map((e) => [e.id, e]));

export const getEra = (id: string): Era | undefined => ERA_INDEX.get(id as EraId);

export const getTopic = (id: string): TopicRef | undefined => {
  const i = TOPIC_INDEX.get(id);
  return i === undefined ? undefined : ALL_TOPICS[i];
};

export const getAdjacentTopics = (id: string) => {
  const i = TOPIC_INDEX.get(id) ?? -1;
  return { prev: ALL_TOPICS[i - 1], next: ALL_TOPICS[i + 1] };
};

export interface Progress {
  done: number;
  total: number;
  ratio: number;
}

const toProgress = (done: number, total: number): Progress => ({
  done,
  total,
  ratio: total === 0 ? 0 : done / total,
});

export const overallProgress = (completed: Set<string>): Progress =>
  toProgress(ALL_TOPICS.filter((t) => completed.has(t.id)).length, ALL_TOPICS.length);

export const eraProgress = (era: Era, completed: Set<string>): Progress =>
  toProgress(era.topics.filter((t) => completed.has(t.id)).length, era.topics.length);

/** 이어서 학습: 마지막 본 단원이 미완료면 그것, 아니면 첫 미완료 단원 */
export const nextTopic = (completed: Set<string>, lastTopicId: string | null): TopicRef | undefined => {
  if (lastTopicId && !completed.has(lastTopicId)) return getTopic(lastTopicId);
  return ALL_TOPICS.find((t) => !completed.has(t.id));
};

export interface TermEntry extends KeyTerm {
  topicId: string;
  topicTitle: string;
  eraId: EraId;
  eraName: string;
}

export const ALL_TERMS: TermEntry[] = ALL_TOPICS.flatMap((t) =>
  t.terms.map((term) => ({
    ...term,
    topicId: t.id,
    topicTitle: t.title,
    eraId: t.eraId,
    eraName: t.eraName,
  })),
);

export const searchTerms = (query: string, eraId: EraId | 'all'): TermEntry[] => {
  const q = query.trim().toLowerCase();
  return ALL_TERMS.filter(
    (t) =>
      (eraId === 'all' || t.eraId === eraId) &&
      (!q || t.term.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)),
  );
};