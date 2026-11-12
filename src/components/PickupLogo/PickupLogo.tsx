import * as React from 'react';
import { cx } from '../../utils/cx';
import logoUrl from '../../assets/pickup-logo.svg';

export interface PickupLogoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {}

/** PickupLogo: Figma component "pickup-logo" (252:212). Native size is 101×40. */
export const PickupLogo = React.forwardRef<HTMLImageElement, PickupLogoProps>(function PickupLogo(
  { className, alt = 'Pickup', width = 101, height = 40, ...rest },
  ref,
) {
  return <img ref={ref} src={logoUrl} alt={alt} width={width} height={height} className={cx('pk-logo', className)} {...rest} />;
});
