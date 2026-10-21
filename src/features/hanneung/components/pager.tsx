import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PagerItem {
  to: string;
  caption: string;
  title: string;
}

export function Pager({ label, prev, next }: { label: string; prev?: PagerItem; next?: PagerItem }) {
  const linkClass = 'flex min-w-0 items-center gap-2.5 py-3 font-semibold hover:text-primary';
  return (
    <nav aria-label={label} className="flex flex-wrap justify-between gap-3 border-t pt-2">
      {prev ? (
        <Link to={prev.to} className={linkClass}>
          <ChevronLeft className="size-5 shrink-0" aria-hidden="true" />
          <span>
            <small className="block text-xs font-medium text-muted-foreground">{prev.caption}</small>
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.to} className={`${linkClass} ml-auto text-right`}>
          <span>
            <small className="block text-xs font-medium text-muted-foreground">{next.caption}</small>
            {next.title}
          </span>
          <ChevronRight className="size-5 shrink-0" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}