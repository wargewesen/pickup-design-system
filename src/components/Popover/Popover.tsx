import * as React from 'react';
import { cx } from '../../utils/cx';
import './Popover.css';

export interface PopoverProps {
  /** The trigger element (e.g. a Button). It receives aria-expanded and an onClick toggle. */
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  /** Figma "Title". */
  title?: React.ReactNode;
  /** Figma "Content": body content of the PopoverContent. */
  children?: React.ReactNode;
  /** Figma State=Open (controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Popover: Figma "Popover" (2381:8888), i.e. PopoverTrigger + PopoverContent.
 * Closes on Escape and on outside click.
 */
export function Popover({ trigger, title, children, open, defaultOpen = false, onOpenChange, className }: PopoverProps) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open ?? internal;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const contentId = React.useId();

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternal(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, setOpen]);

  const triggerEl = React.cloneElement(trigger, {
    'aria-expanded': isOpen,
    'aria-controls': contentId,
    'aria-haspopup': 'dialog',
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event);
      setOpen(!isOpen);
    },
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <div ref={rootRef} className={cx('pk-popover', className)}>
      {triggerEl}
      {isOpen && (
        <div id={contentId} role="dialog" className="pk-popover__content">
          {title != null && <p className="pk-popover__title">{title}</p>}
          {children != null && <div className="pk-popover__body">{children}</div>}
        </div>
      )}
    </div>
  );
}
