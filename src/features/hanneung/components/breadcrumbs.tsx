import { Fragment } from 'react';
import { Link } from 'react-router';

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="flex flex-wrap gap-2 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-foreground">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}