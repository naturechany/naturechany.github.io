import { describe, expect, it } from 'vitest';
import { MOCK_EXAMS } from './exams';
import { EXAM_IMAGES } from './exam-images';
import { getTopic } from '../lib/selectors';

describe.each(MOCK_EXAMS)('모의고사 $id', (exam) => {
  it('50문항, 1~50 연번', () => {
    expect(exam.questions.map((q) => q.no)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  });

  it('배점 합계 100점', () => {
    expect(exam.questions.reduce((sum, q) => sum + q.points, 0)).toBe(100);
  });

  it('선지는 서로 다르고 연결 단원이 존재', () => {
    for (const q of exam.questions) {
      expect(new Set(q.choices).size, `${q.no}번`).toBe(5);
      if (q.topicId) expect(getTopic(q.topicId), `${q.no}번 ${q.topicId}`).toBeDefined();
    }
  });

  it('정답 번호가 한쪽으로 쏠리지 않음', () => {
    const counts = [1, 2, 3, 4, 5].map((n) => exam.questions.filter((q) => q.answer === n).length);
    expect(Math.min(...counts), counts.join(',')).toBeGreaterThanOrEqual(4);
  });
});

describe('문항 사진', () => {
  it('연결된 문항과 파일이 모두 존재', () => {
    const files = Object.keys(import.meta.glob('/public/exams/*.{avif,webp}')).map((p) => p.split('/').pop());
    const keys = new Set(MOCK_EXAMS.flatMap((e) => e.questions.map((q) => `${e.id}:${q.no}`)));
    for (const [key, img] of Object.entries(EXAM_IMAGES)) {
      expect(keys.has(key), key).toBe(true);
      expect(files, img.file).toContain(`${img.file}.avif`);
      expect(files, img.file).toContain(`${img.file}.webp`);
    }
  });
});
