import * as React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { cx } from '../../utils/cx';
import { Badge } from '../Badge/Badge';
import { IconButton } from '../IconButton/IconButton';
import './ItemCard.css';

export interface ItemCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma "Title". */
  title: React.ReactNode;
  /** Figma "Price", e.g. "$65". */
  price: React.ReactNode;
  /** Figma "Distance", e.g. "2.3 mi". */
  distance?: React.ReactNode;
  /** Condition badge label, e.g. "Good". */
  condition?: React.ReactNode;
  /** Product image URL. Use `image` instead for a custom node. */
  imageSrc?: string;
  imageAlt?: string;
  /** Figma "Product image" slot. Overrides imageSrc. */
  image?: React.ReactNode;
  /** Whether the item is saved (fills the heart). */
  saved?: boolean;
  /** Shows the save IconButton when set. */
  onSaveToggle?: () => void;
  /** Makes the whole card clickable (the title becomes a button stretched over the card). */
  onOpen?: () => void;
  /** Extra content after the distance, e.g. a 16px "delivery available" icon. */
  metaAddon?: React.ReactNode;
}

/** ItemCard: Figma component "Item Card" (110:125). Marketplace listing card with a product-image slot. */
export const ItemCard = React.forwardRef<HTMLElement, ItemCardProps>(function ItemCard(
  { title, price, distance, condition, imageSrc, imageAlt = '', image, saved = false, onSaveToggle, onOpen, metaAddon, className, ...rest },
  ref,
) {
  return (
    <article ref={ref} className={cx('pk-item-card', onOpen && 'pk-item-card--interactive', className)} {...rest}>
      <div className="pk-item-card__header">
        <div className="pk-item-card__details">
          <h3 className="pk-item-card__title">
            {onOpen ? (
              <button type="button" className="pk-item-card__open" onClick={onOpen}>
                {title}
              </button>
            ) : (
              title
            )}
          </h3>
          <p className="pk-item-card__meta">
            <span>{price}</span>
            {distance != null && (
              <>
                <span className="pk-item-card__dot" aria-hidden="true" />
                <span>{distance}</span>
              </>
            )}
            {metaAddon != null && <span className="pk-item-card__addon">{metaAddon}</span>}
          </p>
        </div>
        {condition != null && <Badge variant="condition">{condition}</Badge>}
      </div>
      <div className="pk-item-card__media">
        {image ?? (imageSrc ? <img src={imageSrc} alt={imageAlt} className="pk-item-card__img" /> : null)}
      </div>
      {onSaveToggle && (
        <IconButton
          className="pk-item-card__save"
          size="compact"
          icon={saved ? <HeartSolidIcon /> : <HeartIcon />}
          aria-label={saved ? 'Remove from saves' : 'Save item'}
          aria-pressed={saved}
          onClick={onSaveToggle}
        />
      )}
    </article>
  );
});
