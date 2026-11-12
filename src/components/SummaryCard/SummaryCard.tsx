import * as React from 'react';
import { cx } from '../../utils/cx';
import './SummaryCard.css';

export interface SummaryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** Secondary line in DM Mono, e.g. "$420 · Excellent". */
  meta?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

/** SummaryCard: Figma "Summary card" (66:400). Horizontal card with an 80px image well and 16px gap. */
export const SummaryCard = React.forwardRef<HTMLDivElement, SummaryCardProps>(function SummaryCard(
  { title, meta, imageSrc, imageAlt = '', className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('pk-summary-card', className)} {...rest}>
      <div className="pk-summary-card__media">{imageSrc && <img src={imageSrc} alt={imageAlt} />}</div>
      <div className="pk-summary-card__body">
        <p className="pk-summary-card__title">{title}</p>
        {meta != null && <p className="pk-summary-card__meta">{meta}</p>}
      </div>
    </div>
  );
});
