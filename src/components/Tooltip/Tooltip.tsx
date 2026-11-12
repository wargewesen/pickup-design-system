import * as React from 'react';
import { cx } from '../../utils/cx';
import './Tooltip.css';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /** Figma "Text": the TooltipContent children. */
  content: React.ReactNode;
  /** Figma "Side". */
  side?: TooltipSide;
  /** The trigger. It must be focusable (e.g. a Button or IconButton). */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  className?: string;
}

/** Tooltip: Figma "Tooltip" (2382:8891). Shows on hover and keyboard focus. */
export function Tooltip({ content, side = 'top', children, className }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  const trigger = React.cloneElement(children, {
    'aria-describedby': open ? id : undefined,
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      children.props.onFocus?.(e);
      setOpen(true);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      children.props.onBlur?.(e);
      setOpen(false);
    },
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <span
      className={cx('pk-tooltip', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      {trigger}
      {open && (
        <TooltipContent id={id} side={side} className="pk-tooltip__floating">
          {content}
        </TooltipContent>
      )}
    </span>
  );
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: TooltipSide;
}

/** TooltipContent: the static bubble + arrow. It can be used on its own for documentation or custom positioning. */
export function TooltipContent({ side = 'top', className, children, ...rest }: TooltipContentProps) {
  return (
    <div role="tooltip" className={cx('pk-tooltip__content', `pk-tooltip__content--${side}`, className)} {...rest}>
      {children}
      <svg className="pk-tooltip__arrow" width="14" height="6" viewBox="0 0 14 6" aria-hidden="true">
        <path d="M0 0H14L8.4 5.43698C7.6268 6.18767 6.3732 6.18767 5.6 5.43698L0 0Z" fill="currentColor" />
      </svg>
    </div>
  );
}
