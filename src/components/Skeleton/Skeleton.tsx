import * as React from 'react';
import { cx } from '../../utils/cx';
import './Skeleton.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** rounded = 8px radius, pill = fully rounded. */
  shape?: 'rounded' | 'pill';
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
}

/** Skeleton: a muted loading placeholder (from Figma "Skeleton stack", 66:437). */
export function Skeleton({ shape = 'rounded', width, height, className, style, ...rest }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cx('pk-skeleton', `pk-skeleton--${shape}`, className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}

export interface SkeletonStackProps extends React.HTMLAttributes<HTMLDivElement> {}

/** SkeletonStack: Figma "Skeleton stack" (66:437). Muted loading stack of 32px, 96px and 48px-pill skeletons. */
export const SkeletonStack = React.forwardRef<HTMLDivElement, SkeletonStackProps>(function SkeletonStack(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} role="status" aria-busy="true" aria-label="Loading" className={cx('pk-skeleton-stack', className)} {...rest}>
      {children ?? (
        <>
          <Skeleton width="50%" height={32} />
          <Skeleton width="100%" height={96} />
          <Skeleton shape="pill" width="100%" height={48} />
        </>
      )}
    </div>
  );
});
