import * as React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cx } from '../../utils/cx';
import type { FieldVariant } from '../Input/Input';
import '../Input/Input.css';
import './Select.css';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Figma "Variant". */
  variant?: FieldVariant;
  /** Figma "Size": default = 48px, compact = 32px. */
  size?: 'default' | 'compact';
  /** Figma State=Invalid. */
  invalid?: boolean;
}

/**
 * Select: Figma component set "Select" (106:112).
 * A styled native <select> with a 20px chevron (heroicons-mini/chevron-down). Pass <option> children.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { variant = 'filled', size = 'default', invalid = false, disabled, className, children, 'aria-invalid': ariaInvalid, ...rest },
  ref,
) {
  return (
    <div
      className={cx(
        'pk-field',
        'pk-select',
        `pk-field--${variant}`,
        `pk-select--${size}`,
        invalid && 'pk-field--invalid',
        disabled && 'pk-field--disabled',
        className,
      )}
    >
      <select
        ref={ref}
        disabled={disabled}
        aria-invalid={ariaInvalid ?? (invalid || undefined)}
        className="pk-select__control"
        {...rest}
      >
        {children}
      </select>
      <ChevronDownIcon className="pk-select__chevron" aria-hidden="true" />
    </div>
  );
});
