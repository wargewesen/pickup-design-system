import * as React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { cx } from '../../utils/cx';
import { IconButton } from '../IconButton/IconButton';
import './PageHeader.css';

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  /** Shows the leading back action (chevron-left) when set. */
  onBack?: () => void;
  backLabel?: string;
  /** Figma "Trailing action" slot (48px). */
  trailing?: React.ReactNode;
  /** Makes the header sticky at the top of its scroll container. */
  sticky?: boolean;
}

/** PageHeader: Figma "Page header" (66:410). 80px header with a 16/24 medium title. */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, onBack, backLabel = 'Back', trailing, sticky = false, className, ...rest },
  ref,
) {
  return (
    <header ref={ref} className={cx('pk-page-header', sticky && 'pk-page-header--sticky', className)} {...rest}>
      <div className="pk-page-header__slot">
        {onBack && <IconButton variant="ghost" icon={<ChevronLeftIcon />} aria-label={backLabel} onClick={onBack} />}
      </div>
      <h1 className="pk-page-header__title">{title}</h1>
      <div className="pk-page-header__slot pk-page-header__slot--trailing">{trailing}</div>
    </header>
  );
});
