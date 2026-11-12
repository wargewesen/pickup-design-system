import * as React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { cx } from '../../utils/cx';
import type { FieldVariant } from '../Input/Input';
import '../Input/Input.css';
import './SearchField.css';

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Figma "Variant". */
  variant?: FieldVariant;
  /** Figma State=Invalid. */
  invalid?: boolean;
  /** Figma "Clear" boolean. Shows a clear button when set; called when pressed. */
  onClear?: () => void;
  /** Accessible label for the clear button. */
  clearLabel?: string;
}

/** SearchField: Figma component set "Search field" (2338:8905). Pill-shaped 48px search input. */
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { variant = 'filled', invalid = false, disabled, onClear, clearLabel = 'Clear search', className, 'aria-invalid': ariaInvalid, ...rest },
  ref,
) {
  return (
    <div
      className={cx(
        'pk-field',
        'pk-search',
        `pk-field--${variant}`,
        invalid && 'pk-field--invalid',
        disabled && 'pk-field--disabled',
        className,
      )}
    >
      <MagnifyingGlassIcon className="pk-search__icon" aria-hidden="true" />
      <input
        ref={ref}
        type="search"
        disabled={disabled}
        aria-invalid={ariaInvalid ?? (invalid || undefined)}
        className="pk-search__control"
        {...rest}
      />
      {onClear && (
        <button type="button" className="pk-search__clear" onClick={onClear} disabled={disabled} aria-label={clearLabel}>
          <XMarkIcon aria-hidden="true" />
        </button>
      )}
    </div>
  );
});
