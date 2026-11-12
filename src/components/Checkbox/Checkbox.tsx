import * as React from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/16/solid';
import { cx } from '../../utils/cx';
import './Checkbox.css';

export type CheckedState = boolean | 'indeterminate';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'defaultChecked' | 'size'> {
  /** Figma "Checked": false | true | 'indeterminate' (controlled). */
  checked?: CheckedState;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Figma State=Invalid. */
  invalid?: boolean;
}

/** Checkbox: Figma component set "Checkbox" (2378:8889). A native checkbox with a 24px custom indicator. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, defaultChecked, onCheckedChange, onChange, invalid = false, className, style, ...rest },
  forwardedRef,
) {
  const innerRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement);

  const indeterminate = checked === 'indeterminate';
  React.useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <span className={cx('pk-checkbox', invalid && 'pk-checkbox--invalid', className)} style={style}>
      <input
        ref={innerRef}
        type="checkbox"
        className="pk-checkbox__input"
        checked={checked === undefined ? undefined : checked === true}
        defaultChecked={defaultChecked}
        aria-checked={indeterminate ? 'mixed' : undefined}
        aria-invalid={invalid || undefined}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked);
        }}
        {...rest}
      />
      <span className="pk-checkbox__box" aria-hidden="true">
        {indeterminate ? (
          <MinusIcon className="pk-checkbox__indicator pk-checkbox__indicator--mixed" />
        ) : (
          <CheckIcon className="pk-checkbox__indicator pk-checkbox__indicator--check" />
        )}
      </span>
    </span>
  );
});
