import * as React from 'react';
import { cx } from '../../utils/cx';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma "Variant": filled = white surface, outline = transparent with a hairline (white-on-white use). */
  variant?: 'filled' | 'outline';
  /** Figma "Size": default = 16px padding / 12px gap, sm = 8px padding / 8px gap. */
  size?: 'default' | 'sm';
}

/** Card: Figma component set "Card" (2136:11274). Compose with CardTitle and CardDescription. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'filled', size = 'default', className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('pk-card', `pk-card--${variant}`, `pk-card--${size}`, className)} {...rest} />;
});

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...rest }, ref) {
    return <h3 ref={ref} className={cx('pk-card__title', className)} {...rest} />;
  },
);

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return <p ref={ref} className={cx('pk-card__description', className)} {...rest} />;
  },
);
