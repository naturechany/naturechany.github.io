const DAY_MS = 86_400_000;

/** yyyy-mm-dd 기준 로컬 자정끼리 비교한 남은 일수. 날짜가 없으면 null */
export function daysUntil(date: string | null, now = new Date()): number | null {
  if (!date) return null;
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return null;
  const target = new Date(y, m - 1, d).getTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((target - today) / DAY_MS);
}

export function formatDday(days: number): string {
  if (days === 0) return 'D-DAY';
  return days > 0 ? `D-${days}` : `D+${-days}`;
}

export function formatKoreanDate(date: string): string {
  const [y, m, d] = date.split('-');
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}