import { formatOrder, formatReign } from '../data/rulers';
import type { Ruler } from '../types';

/** 시대 화면의 왕(정부) 재위 연표. 나라가 여럿이면 나라 열을 표시 */
export function RulerTable({ rulers }: { rulers: Ruler[] }) {
  const multi = new Set(rulers.map((r) => r.dynasty ?? '')).size > 1;
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full min-w-[36rem] text-sm">
        <caption className="sr-only">왕·정부 재위 연표</caption>
        <thead className="bg-muted text-xs text-muted-foreground">
          <tr>
            {multi && (
              <th scope="col" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                나라
              </th>
            )}
            {['왕·정부', '대수', '재위', '핵심'].map((h) => (
              <th key={h} scope="col" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rulers.map((r) => (
            <tr key={`${r.dynasty ?? ''}-${r.name}`} className="border-t align-top">
              {multi && <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">{r.dynasty}</td>}
              <th scope="row" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                {r.name}
              </th>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">{r.order ? formatOrder({ ...r, dynasty: undefined }) : '—'}</td>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">{formatReign(r)}</td>
              <td className="px-3 py-2">{r.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}