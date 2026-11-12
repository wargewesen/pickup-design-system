import * as React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { cx } from '../../utils/cx';
import './Empty.css';

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma "Title" (EmptyTitle). */
  title: React.ReactNode;
  /** Figma "Description" (EmptyDescription). */
  description?: React.ReactNode;
  /** Figma "Icon" (EmptyMedia): a 24px icon in a 48px primary disc. */
  icon?: React.ReactNode;
  /** Figma "Action" (EmptyContent), e.g. a Button. */
  action?: React.ReactNode;
}

/** Empty: Figma "Empty" (66:433). Centered 16px-gap empty state. */
export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { title, description, icon = <ShoppingBagIcon />, action, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('pk-empty', className)} {...rest}>
      <span className="pk-empty__media" aria-hidden="true">
        {icon}
      </span>
      <p className="pk-empty__title">{title}</p>
      {description != null && <p className="pk-empty__description">{description}</p>}
      {action}
    </div>
  );
});
