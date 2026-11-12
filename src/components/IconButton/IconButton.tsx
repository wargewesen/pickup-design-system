import * as React from 'react';
import { cx } from '../../utils/cx';
import type { ButtonSize } from '../Button/Button';
import './IconButton.css';

export type IconButtonVariant = 'default' | 'overlay' | 'outline' | 'secondary' | 'ghost' | 'destructive';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma "Variant". */
  variant?: IconButtonVariant;
  /** Figma "Size": default = 48px (24px icon), compact = 32px (16px icon). */
  size?: ButtonSize;
  /** The icon, e.g. a `@heroicons/react/24/outline` component. */
  icon: React.ReactNode;
  /** Accessible name. Icon-only buttons must have one. */
  'aria-label': string;
}

/** IconButton: Figma component set "Icon button" (66:455). */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'default', size = 'default', icon, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('pk-icon-button', `pk-icon-button--${variant}`, `pk-icon-button--size-${size}`, className)}
      {...rest}
    >
      <span className="pk-icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
});
