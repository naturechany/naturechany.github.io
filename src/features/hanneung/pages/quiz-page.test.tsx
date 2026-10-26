import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { StudyProvider } from '../store/study-provider';
import { r76 } from '../data/exams/r76';
import { QuizPage } from './quiz-page';

const renderAt = (path: string) =>
  render(
    <StudyProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/practice/:setId" element={<QuizPage />} />
        </Routes>
      </MemoryRouter>
    </StudyProvider>,
  );

const stored = () => JSON.parse(localStorage.getItem('hanneung:study:v1') ?? '{}');
const choice = (n: number) => screen.getAllByRole('radio')[n - 1];

describe('QuizPage', () => {
  beforeEach(() => localStorage.clear());

  it('연습 모드: 고르면 바로 채점하고 틀린 문항을 오답 노트에 넣는다', () => {
    renderAt('/practice/r76?mode=study');
    const q1 = r76.questions[0];
    const wrongChoice = q1.answer === 1 ? 2 : 1;
    fireEvent.click(choice(wrongChoice));
    expect(screen.getByText(/^오답 · 정답/)).toBeTruthy();
    expect(screen.getByText(q1.explanation)).toBeTruthy();
    expect(stored().wrongNotes).toEqual(['r76:1']);
  });

  it('실전 모드: 미응답 확인 후 제출하면 점수를 기록한다', () => {
    renderAt('/practice/r76?mode=exam');
    fireEvent.click(choice(r76.questions[0].answer));
    fireEvent.click(screen.getByRole('button', { name: '바로 제출' }));
    fireEvent.click(screen.getByRole('button', { name: '제출' }));
    const points = r76.questions[0].points;
    expect(screen.getByText('60점 미만 · 급수 미인정')).toBeTruthy();
    expect(stored().examRecords.r76.score).toBe(points);
    expect(stored().wrongNotes).toHaveLength(49);
  });

  it('오답 노트는 저장된 문항만 푼다', () => {
    localStorage.setItem('hanneung:study:v1', JSON.stringify({ wrongNotes: ['r76:5', 'r76:7'] }));
    renderAt('/practice/wrong');
    expect(screen.getByText('/ 2')).toBeTruthy();
  });
});
