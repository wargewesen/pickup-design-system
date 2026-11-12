import type { ReactNode } from 'react';
import { ChevronLeftIcon, HomeIcon as HomeOutline, MapIcon as MapOutline, PlusIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, MapIcon as MapSolid } from '@heroicons/react/24/solid';
import { IconButton, cx } from '@figma/pickup-design-system';
import { assets } from '@app/lib/assets';

/** Sticky checkout header: back action, centered title, optional "n of 3" step meter. */
export function CheckoutHeader({
  title = 'Checkout',
  step,
  onBack,
  backLabel = 'Go back',
}: {
  title?: string;
  step?: 1 | 2 | 3;
  onBack: () => void;
  backLabel?: string;
}) {
  return (
    <div className="app-checkout-header">
      <div className="app-checkout-header__bar">
        <IconButton variant="ghost" icon={<ChevronLeftIcon />} aria-label={backLabel} onClick={onBack} />
        <h1 className="pk-text-page-header app-checkout-header__title">{title}</h1>
        {step ? (
          <p className="pk-text-label-sm app-checkout-header__step" aria-label={`Step ${step} of 3`}>
            {step} of 3
          </p>
        ) : (
          <span />
        )}
      </div>
      {step && (
        <div className="app-checkout-header__meter" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <span key={i} className={cx('app-checkout-header__seg', i <= step && 'app-checkout-header__seg--on')} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Visual radio dot used inside role="radio" option rows. */
export function RadioDot({ checked }: { checked: boolean }) {
  return <span aria-hidden="true" className={cx('app-radio', checked && 'app-radio--on')} />;
}

/** Floating grid/map switcher and "list an item" action on the browse screens. */
export function BottomNav({ view, onHome, onMap }: { view: 'home' | 'map'; onHome: () => void; onMap: () => void }) {
  return (
    <div className="app-bottom-nav">
      <div className="app-bottom-nav__inner">
        <nav aria-label="Browse view" className="app-bottom-nav__switch">
          <button type="button" onClick={onHome} aria-label="Grid view" aria-current={view === 'home' ? 'page' : undefined}>
            {view === 'home' ? <HomeSolid /> : <HomeOutline />}
          </button>
          <button type="button" onClick={onMap} aria-label="Map view" aria-current={view === 'map' ? 'page' : undefined}>
            {view === 'map' ? <MapSolid /> : <MapOutline />}
          </button>
        </nav>
        <IconButton className="app-float" icon={<PlusIcon />} aria-label="List an item" />
      </div>
    </div>
  );
}

export function Avatar({ className }: { className?: string }) {
  return (
    <button type="button" aria-label="Your profile" className={cx('app-avatar', className)}>
      <img src={assets.avatar} alt="" />
    </button>
  );
}

/** Dark snackbar pinned above the bottom chrome. */
export function Toast({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" className="app-toast">
      <p className="pk-text-body-base app-toast__text">{children}</p>
      {action}
    </div>
  );
}

/** Pill label anchored to a dot on a static map image. */
export function MapLabel({
  left,
  top,
  children,
  mono = false,
  square = false,
}: {
  left: number;
  top: number;
  children: ReactNode;
  mono?: boolean;
  square?: boolean;
}) {
  return (
    <div className="app-map-label" style={{ left, top }}>
      <span className={cx('app-map-label__dot', square && 'app-map-label__dot--square')} />
      <span className={cx('app-map-label__pill', mono ? 'pk-text-label-sm app-map-label__pill--mono' : 'pk-text-body-base')}>
        {children}
      </span>
    </div>
  );
}

/** Label / value row for price summaries. */
export function SummaryRow({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="app-row">
      <dt className={strong ? 'app-ink' : 'app-muted'}>{k}</dt>
      <dd className="app-ink">{v}</dd>
    </div>
  );
}
