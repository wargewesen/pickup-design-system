import * as React from 'react';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { cx } from '../../utils/cx';
import './Alert.css';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma "Variant". */
  variant?: 'default' | 'destructive';
  /** Figma "Title" (AlertTitle). */
  title?: React.ReactNode;
  /** Figma "Description" (AlertDescription). `children` also works. */
  description?: React.ReactNode;
  /** Figma "Icon" (24px). Defaults to information-circle, or exclamation-triangle for destructive. Pass `null` to hide it. */
  icon?: React.ReactNode | null;
}

/** Alert: Figma component set "Alert" (2399:8887). */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'default', title, description, icon, className, children, ...rest },
  ref,
) {
  const DefaultIcon = variant === 'destructive' ? ExclamationTriangleIcon : InformationCircleIcon;
  const resolvedIcon = icon === undefined ? <DefaultIcon /> : icon;
  return (
    <div
      ref={ref}
      role={variant === 'destructive' ? 'alert' : 'status'}
      className={cx('pk-alert', `pk-alert--${variant}`, className)}
      {...rest}
    >
      {resolvedIcon != null && (
        <span className="pk-alert__icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <div className="pk-alert__content">
        {title != null && <p className="pk-alert__title">{title}</p>}
        {(description ?? children) != null && <div className="pk-alert__description">{description ?? children}</div>}
      </div>
    </div>
  );
});
