import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { BookOpen, History, House, PencilLine, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/', label: '홈', icon: House, end: true },
  { to: '/eras', label: '시대별 학습', icon: History, end: false },
  { to: '/practice', label: '기출 연습', icon: PencilLine, end: false },
  { to: '/keywords', label: '키워드 사전', icon: Search, end: false },
  { to: '/my', label: '내 학습', icon: User, end: false },
] as const;

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 md:h-16">
          <NavLink to="/" className="flex items-center gap-2.5 font-bold" aria-label="한능검 노트 홈">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground" aria-hidden="true">
              <BookOpen className="size-4" />
            </span>
            한능검 노트
          </NavLink>
          <nav aria-label="주 메뉴" className="hidden gap-1 md:flex">
            {NAV.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                    isActive && 'bg-accent text-foreground',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 md:py-10">
        <Outlet />
      </main>

      {/* 모바일 하단 탭바 */}
      <nav
        aria-label="주 메뉴"
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex h-16 flex-col items-center justify-center gap-0.5 text-[11px] text-muted-foreground',
                isActive && 'font-semibold text-primary',
              )
            }
          >
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}