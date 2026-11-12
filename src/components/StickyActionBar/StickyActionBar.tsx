import * as React from 'react';
import { cx } from '../../utils/cx';
import './StickyActionBar.css';

export interface StickyActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pins the bar to the bottom of its scroll container. */
  sticky?: boolean;
}

/**
 * StickyActionBar: Figma "Sticky action bar" (66:446).
 * A 128px scrim that fades into --background. Each child (usually a Button) gets an equal share of the width.
 */
export const StickyActionBar = React.forwardRef<HTMLDivElement, StickyActionBarProps>(function StickyActionBar(
  { sticky = true, className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('pk-action-bar', sticky && 'pk-action-bar--sticky', className)} {...rest} />;
});
