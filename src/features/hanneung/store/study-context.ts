import { createContext, useContext, type Dispatch } from 'react';
import type { ExamLevel, StudyState } from '../types';

export type StudyAction =
  | { type: 'toggleComplete'; id: string }
  | { type: 'toggleBookmark'; id: string }
  | { type: 'visit'; id: string }
  | { type: 'setExam'; level: ExamLevel; grade: number; date: string | null }
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