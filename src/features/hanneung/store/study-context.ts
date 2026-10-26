import { createContext, useContext, type Dispatch } from 'react';
import type { ExamLevel, ExamRecord, StudyState } from '../types';

export type StudyAction =
  | { type: 'toggleComplete'; id: string }
  | { type: 'toggleBookmark'; id: string }
  | { type: 'visit'; id: string }
  | { type: 'setExam'; level: ExamLevel; grade: number; date: string | null }
  | { type: 'saveExamRecord'; examId: string; record: Omit<ExamRecord, 'bestScore'> }
  /** 틀린 문항은 오답 노트에 넣고, 맞힌 문항은 뺀다 */
  | { type: 'syncWrongNotes'; wrong: string[]; right: string[] }
  | { type: 'removeWrongNote'; key: string }
  | { type: 'reset' };

export interface StudyContextValue {
  state: StudyState;
  completedSet: Set<string>;
  bookmarkSet: Set<string>;
  dispatch: Dispatch<StudyAction>;
}

export const StudyContext = createContext<StudyContextValue | null>(null);

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error('useStudy must be used within StudyProvider');
  return ctx;
}