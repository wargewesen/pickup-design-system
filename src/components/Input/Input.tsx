import * as React from 'react';
import { cx } from '../../utils/cx';
import './Input.css';

export type FieldVariant = 'filled' | 'outline';

interface FieldStyleProps {
  /** Figma "Variant": filled = white surface, outline = transparent with hairline. */
  variant?: FieldVariant;
  /** Figma State=Invalid. Sets aria-invalid and the destructive ring. */
  invalid?: boolean;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, FieldStyleProps {}

/** Input: Figma "Text field" (106:111), Type=Input. 48px tall. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = 'filled', invalid = false, className, 'aria-invalid': ariaInvalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
      className={cx('pk-field', 'pk-input', `pk-field--${variant}`, invalid && 'pk-field--invalid', className)}
      {...rest}
    />
  );
});

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldStyleProps {}

/** Textarea: Figma "Text field" (106:111), Type=Textarea. 96px tall. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant = 'filled', invalid = false, className, 'aria-invalid': ariaInvalid, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
      className={cx('pk-field', 'pk-textarea', `pk-field--${variant}`, invalid && 'pk-field--invalid', className)}
      {...rest}
    />
  );
});
