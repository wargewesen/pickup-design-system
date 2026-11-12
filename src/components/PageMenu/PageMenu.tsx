import * as React from 'react';
import { cx } from '../../utils/cx';
import './PageMenu.css';

export interface PageMenuProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible name of the navigation region. */
  'aria-label'?: string;
}

/** PageMenu: Figma "Page menu" (66:415). A list of 56px PageMenuItems with 40px icon wells. */
export const PageMenu = React.forwardRef<HTMLElement, PageMenuProps>(function PageMenu(
  { className, children, 'aria-label': ariaLabel = 'Page menu', ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={cx('pk-page-menu', className)} {...rest}>
      <ul className="pk-page-menu__list">{children}</ul>
    </nav>
  );
});

export interface PageMenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 24px icon shown inside the white icon well. */
  icon: React.ReactNode;
}

/** PageMenuItem: one row of a PageMenu. Renders a link when `href` is set, otherwise a button. */
export function PageMenuItem({ icon, className, children, href, onClick, ...rest }: PageMenuItemProps) {
  const content = (
    <>
      <span className="pk-page-menu__well" aria-hidden="true">
        {icon}
      </span>
      <span className="pk-page-menu__label">{children}</span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} onClick={onClick} className={cx('pk-page-menu__item', className)} {...rest}>
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
          className={cx('pk-page-menu__item', className)}
        >
          {content}
        </button>
      )}
    </li>
  );
}
