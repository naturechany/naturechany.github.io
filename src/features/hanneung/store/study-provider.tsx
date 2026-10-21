import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { StudyState } from '../types';
import { StudyContext, type StudyAction } from './study-context';

const STORAGE_KEY = 'hanneung:study:v1';

const INITIAL: StudyState = {
  completed: [],
  bookmarks: [],
  examLevel: 'advanced',
  targetGrade: 1,
  examDate: null,
  lastTopicId: null,
};

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

function reducer(state: StudyState, action: StudyAction): StudyState {
  switch (action.type) {
    case 'toggleComplete':
      return { ...state, completed: toggle(state.completed, action.id) };
    case 'toggleBookmark':
      return { ...state, bookmarks: toggle(state.bookmarks, action.id) };
    case 'visit':
      return state.lastTopicId === action.id ? state : { ...state, lastTopicId: action.id };
    case 'setExam':
      return { ...state, examLevel: action.level, targetGrade: action.grade, examDate: action.date };
    case 'reset':
      return INITIAL;
  }
}

// 사파리 프라이빗 모드 등에서 storage 접근이 throw 할 수 있음 → 실패해도 동작 유지
function load(): StudyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...INITIAL, ...(JSON.parse(raw) as Partial<StudyState>) } : INITIAL;
  } catch {
    return INITIAL;
  }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* noop */
    }
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      completedSet: new Set(state.completed),
      bookmarkSet: new Set(state.bookmarks),
    }),
    [state],
  );

  return <StudyContext value={value}>{children}</StudyContext>;
}