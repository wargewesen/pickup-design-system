import * as React from 'react';
import { cx } from '../../utils/cx';
import './Switch.css';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** Figma "Checked" (controlled). */
  checked?: boolean;
  /** Initial value when uncontrolled. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Figma "Size": default = 48×32, sm = 40×24. */
  size?: 'default' | 'sm';
  /** Figma State=Invalid. */
  invalid?: boolean;
}

/** Switch: Figma component set "Switch" (2327:8860). Renders role="switch". */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked = false, onCheckedChange, size = 'default', invalid = false, className, onClick, disabled, ...rest },
  ref,
) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      data-state={isOn ? 'checked' : 'unchecked'}
      className={cx('pk-switch', `pk-switch--${size}`, invalid && 'pk-switch--invalid', className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (!isControlled) setInternal(!isOn);
        onCheckedChange?.(!isOn);
      }}
      {...rest}
    >
      <span className="pk-switch__thumb" aria-hidden="true" />
    </button>
  );
});
