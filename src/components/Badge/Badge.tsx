import * as React from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'condition';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma "Variant". `condition` is the lime item-condition badge (e.g. "Good"). */
  variant?: BadgeVariant;
}

/** Badge: Figma component set "Badge" (66:383). 20px pill, DM Mono 12/16. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', className, ...rest },
  ref,
) {
  return <span ref={ref} className={cx('pk-badge', `pk-badge--${variant}`, className)} {...rest} />;
});
