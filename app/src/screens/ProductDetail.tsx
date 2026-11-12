import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/16/solid';
import { Alert, Badge, Button, IconButton, StickyActionBar } from '@figma/pickup-design-system';
import { assets } from '@app/lib/assets';
import { DELIVERY_FEE, SELLER, type Product } from '@app/lib/products';

export function ProductDetail({
  p,
  onClose,
  onBuy,
  saved,
  toggleSaved,
}: {
  p: Product;
  onClose: () => void;
  onBuy: () => void;
  saved: boolean;
  toggleSaved: () => void;
}) {
  return (
    <div role="dialog" aria-modal="true" aria-label={p.name} className="app-page">
      <div className="app-product">
        <div className="app-product__hero">
          <img src={p.image} alt="" />
        </div>
        <div className="app-stack app-stack--24 app-pad">
          <div className="app-stack app-stack--16">
            <Badge variant="condition">{p.condition}</Badge>
            <div className="app-stack app-stack--4">
              <p className="pk-text-display-md app-ink">${p.price}</p>
              <h1 className="pk-text-body-lg app-product__name">{p.name}</h1>
            </div>
            <div className="app-row-wrap">
              {[p.category, p.size].map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="pk-text-body-base app-ink">{p.description}</p>
          </div>

          <div className="app-seller">
            <img src={assets.sellerAvatar} alt="" className="app-seller__avatar" />
            <div className="app-stack app-stack--4">
              <p className="pk-text-body-base-emphasized app-ink">{SELLER.name}</p>
              <p className="app-seller__meta">
                <StarIcon className="app-seller__star" aria-hidden="true" />
                <span className="pk-text-label-sm app-muted">
                  {SELLER.rating} · {SELLER.sales} sales
                </span>
              </p>
            </div>
          </div>

          <div className="app-mini-map">
            <img src={assets.mapProduct} alt="" className="app-mini-map__img" />
            <div className="app-mini-map__label">
              <span className="app-map-label__dot app-map-label__dot--filled" />
              <span className="pk-text-body-base app-map-label__pill">{SELLER.area}</span>
            </div>
          </div>

          <Alert
            title="Delivery in 24-40 mins"
            description={`A neighbor meets the seller and brings it to you, about $${DELIVERY_FEE} for this trip.`}
          />
        </div>
      </div>

      <div className="app-product__close">
        <IconButton variant="overlay" icon={<XMarkIcon />} aria-label="Close listing" onClick={onClose} />
      </div>
      <StickyActionBar className="app-product__actions">
        <Button variant="outline" aria-pressed={saved} onClick={toggleSaved}>
          {saved ? 'Saved' : 'Save'}
        </Button>
        <Button onClick={onBuy}>Buy now</Button>
      </StickyActionBar>
    </div>
  );
}
