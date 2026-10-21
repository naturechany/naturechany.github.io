import type { ExamLevel } from '../types';

export interface GradeRule {
  grade: number;
  minScore: number;
}

export interface ExamSpec {
  level: ExamLevel;
  label: string;
  questions: number;
  minutes: number;
  grades: GradeRule[];
}

/** 100점 만점 기준 급수 인정 점수 */
export const EXAM_SPECS: Record<ExamLevel, ExamSpec> = {
  advanced: {
    level: 'advanced',
    label: '심화',
    questions: 50,
    minutes: 80,
    grades: [
      { grade: 1, minScore: 80 },
      { grade: 2, minScore: 70 },
      { grade: 3, minScore: 60 },
    ],
  },
  basic: {
    level: 'basic',
    label: '기본',
    questions: 50,
    minutes: 70,
    grades: [
      { grade: 4, minScore: 80 },
      { grade: 5, minScore: 70 },
      { grade: 6, minScore: 60 },
    ],
  },
};