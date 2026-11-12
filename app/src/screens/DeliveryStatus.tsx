import { useEffect, useState } from 'react';
import { CheckIcon, TruckIcon } from '@heroicons/react/16/solid';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { Button, SummaryCard, cx } from '@figma/pickup-design-system';
import { assets } from '@app/lib/assets';
import { DELIVERY_FEE, SELLER, type Product } from '@app/lib/products';
import { CheckoutHeader, MapLabel, SummaryRow } from '@app/components/chrome';
import { formatFull, type ConfirmedAddress } from '@app/features/address/types';

const steps = [
  { title: 'Finding a courier', sub: 'Pinging neighbors near the pickup' },
  { title: 'Heading to the seller', sub: `Courier is on the way to ${SELLER.area}` },
  { title: 'Item picked up', sub: 'Your item is with the courier' },
  { title: 'On the way to you', sub: 'Heading to your address' },
  { title: 'Delivered', sub: 'Enjoy your find' },
];
const etas = ['37 min away', '30 min away', '22 min away', '9 min away', 'Arrived'];

export function DeliveryStatus({
  p,
  address,
  onBack,
  onBrowse,
  autoAdvance = true,
  initialStep = 0,
}: {
  p: Product;
  address: ConfirmedAddress;
  onBack: () => void;
  onBrowse: () => void;
  /** Prototype only: advance the courier every few seconds. */
  autoAdvance?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(initialStep);
  useEffect(() => {
    if (!autoAdvance || step >= steps.length - 1) return;
    const id = setTimeout(() => setStep((s) => s + 1), 4000);
    return () => clearTimeout(id);
  }, [step, autoAdvance]);

  const progress = step === steps.length - 1 ? 100 : Math.max(3, ((step + 0.12) / (steps.length - 0.88)) * 100);

  return (
    <div className="app-page">
      <div className="app-narrow app-pad-bottom-48">
        <CheckoutHeader title="Delivery Status" onBack={onBack} />
        <div className="app-route-map app-route-map--256">
          <div className="app-route-map__canvas">
            <img src={assets.mapStatus} alt="" className="app-route-map__img" />
            <MapLabel left={115.5} top={193}>
              {SELLER.area}
            </MapLabel>
            <MapLabel left={201} top={33}>
              You
            </MapLabel>
            <span className="app-courier">
              <TruckIcon aria-hidden="true" />
            </span>
            <img src={assets.attribution} alt="" className="app-route-map__attr" style={{ top: 222 }} />
          </div>
        </div>
        <div className="app-stack app-stack--24 app-pad">
          <div className="app-stack app-stack--4" aria-live="polite">
            <div className="pk-text-body-base app-row">
              <p className="app-ink">{steps[step].title}</p>
              <p className="app-muted">{etas[step]}</p>
            </div>
            <p className="pk-text-body-base app-muted">{steps[step].sub}</p>
          </div>
          <div
            className="app-progress"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-label="Delivery progress"
          >
            <div className="app-progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <ol className="app-timeline">
            {steps.map((s, i) => (
              <li key={s.title} className="app-timeline__item">
                <span
                  className={cx('app-timeline__dot', i === step && 'app-timeline__dot--current', i < step && 'app-timeline__dot--done')}
                  aria-hidden="true"
                >
                  {i < step && <CheckIcon />}
                </span>
                <div>
                  <p className={cx('pk-text-body-base', i === step ? 'app-ink' : 'app-muted')}>{s.title}</p>
                  {i === step && <p className="pk-text-body-base app-muted">{s.sub}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="app-courier-card">
            <SummaryCard
              className="app-full app-courier-card__summary"
              imageSrc={p.image}
              title={p.name}
              meta={step === 0 ? 'Courier: finding…' : 'Courier: Manu Gowda'}
            />
            <div className="app-address-line">
              <MapPinIcon className="app-icon-20 app-muted" aria-hidden="true" />
              <p className="pk-text-body-base app-muted app-grow">To {formatFull(address)}</p>
            </div>
          </div>
          <dl className="pk-text-body-base app-stack app-stack--8">
            <SummaryRow k="Item" v={`$${p.price}`} />
            <SummaryRow k="Delivery" v={`$${DELIVERY_FEE}`} />
            <div className="app-divider" />
            <SummaryRow k="Total paid" v={`$${p.price + DELIVERY_FEE}`} strong />
          </dl>
          <div className="app-actions">
            <Button variant="ghost" onClick={onBrowse}>
              View purchases
            </Button>
            <Button onClick={onBrowse}>Keep browsing</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
