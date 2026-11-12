import { HandRaisedIcon, TruckIcon } from '@heroicons/react/24/outline';
import { Badge, Button, StickyActionBar, SummaryCard, cx } from '@figma/pickup-design-system';
import { DELIVERY_FEE, SELLER, type Product } from '@app/lib/products';
import { CheckoutHeader, RadioDot } from '@app/components/chrome';

export type Fulfillment = 'delivery' | 'pickup';

export function CheckoutOptions({
  p,
  value,
  onChange,
  onBack,
  onContinue,
}: {
  p: Product;
  value: Fulfillment;
  onChange: (v: Fulfillment) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const opts = [
    {
      id: 'delivery' as const,
      Icon: TruckIcon,
      title: 'Delivery',
      badge: 'Pickup exclusive',
      body: `A neighbor picks it up in ${SELLER.area} and brings it to you. ${p.size}.`,
      price: `$${DELIVERY_FEE}`,
    },
    {
      id: 'pickup' as const,
      Icon: HandRaisedIcon,
      title: 'Pick it up myself',
      body: `Arrange a time with ${SELLER.name} and meet in ${SELLER.area}.`,
      price: 'Free',
    },
  ];
  return (
    <div className="app-page">
      <div className="app-narrow">
        <CheckoutHeader step={1} onBack={onBack} />
        <div className="app-stack app-stack--32 app-pad">
          <div className="app-stack app-stack--4">
            <h2 className="pk-text-heading-md app-ink">How would you like to get it?</h2>
            <p className="pk-text-body-base app-muted">Choose delivery to your door or arrange pickup with the seller.</p>
          </div>
          <SummaryCard className="app-full" imageSrc={p.image} title={p.name} meta={`$${p.price} · ${SELLER.area} · ${p.distance}`} />
          <div role="radiogroup" aria-label="Fulfillment" className="app-stack app-stack--16">
            {opts.map((o) => {
              const on = value === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => onChange(o.id)}
                  className={cx('app-option', on && 'app-option--on')}
                >
                  <RadioDot checked={on} />
                  <span className="app-option__body">
                    <span className="app-option__head">
                      <o.Icon className="app-icon" aria-hidden="true" />
                      <span className="pk-text-body-base-emphasized app-ink">{o.title}</span>
                      {o.badge && <Badge variant="condition">{o.badge}</Badge>}
                    </span>
                    <span className="pk-text-body-base app-muted">{o.body}</span>
                  </span>
                  <span className="pk-text-body-base app-ink">{o.price}</span>
                </button>
              );
            })}
          </div>
        </div>
        <StickyActionBar>
          <Button onClick={onContinue}>Continue</Button>
        </StickyActionBar>
      </div>
    </div>
  );
}
