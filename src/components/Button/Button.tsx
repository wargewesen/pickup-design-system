import * as React from 'react';
import { cx } from '../../utils/cx';
import './Button.css';

export type ButtonVariant = 'default' | 'overlay' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'default' | 'compact';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma "Variant". */
  variant?: ButtonVariant;
  /** Figma "Size": default = 48px, compact = 32px. */
  size?: ButtonSize;
  /** Figma "Trailing icon" slot (16px). */
  trailingIcon?: React.ReactNode;
}

/**
 * Button: Figma component set "Button" (66:332).
 * Hover / Pressed / Focus / Disabled are real interaction states (:hover, :active, :focus-visible, :disabled).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', size = 'default', trailingIcon, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('pk-button', `pk-button--${variant}`, `pk-button--size-${size}`, className)}
      {...rest}
    >
      <span className="pk-button__label">{children}</span>
      {trailingIcon != null && (
        <span className="pk-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
});
