import * as React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cx } from '../../utils/cx';
import './Accordion.css';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Accordion: wrapper for one or more AccordionItems (Figma "Accordion", 2380:8883). */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('pk-accordion', className)} {...rest} />;
});

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma "Title": the trigger label. */
  title: React.ReactNode;
  /** Figma State=Expanded (controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * AccordionItem: Figma "Accordion" (2380:8883). State maps to `open`.
 * Children are the AccordionContent (Figma "Content").
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { title, open, defaultOpen = false, onOpenChange, className, children, ...rest },
  ref,
) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open ?? internal;
  const id = React.useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  const toggle = () => {
    if (open === undefined) setInternal(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <div ref={ref} className={cx('pk-accordion__item', className)} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      <h3 className="pk-accordion__heading">
        <button
          id={triggerId}
          type="button"
          className="pk-accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggle}
        >
          <span className="pk-accordion__title">{title}</span>
          <ChevronDownIcon className="pk-accordion__chevron" aria-hidden="true" />
        </button>
      </h3>
      <div id={contentId} role="region" aria-labelledby={triggerId} className="pk-accordion__content" hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
});
