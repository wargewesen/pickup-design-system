import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Button, Empty, IconButton, ItemCard, PickupLogo } from '@figma/pickup-design-system';
import { assets } from '@app/lib/assets';
import { products, type Product } from '@app/lib/products';
import { Avatar, BottomNav, Toast } from '@app/components/chrome';
import { DeliveryAvailableIcon } from '@app/components/DeliveryAvailableIcon';

const categories = ['For you', 'Music Gear', 'Furniture', 'Home Goods', 'Clothes', 'Trinkets'];

export function Home({
  onOpen,
  onMap,
  saved,
  toggleSaved,
  toast,
}: {
  onOpen: (p: Product) => void;
  onMap: () => void;
  saved: Set<string>;
  toggleSaved: (id: string) => void;
  toast?: string | null;
}) {
  const [cat, setCat] = useState('For you');
  const list = cat === 'For you' ? products : products.filter((p) => p.category === cat);

  return (
    <div className="app-page">
      <header className="app-browse-header">
        <div className="app-browse-header__inner">
          <IconButton variant="overlay" icon={<MagnifyingGlassIcon />} aria-label="Search" className="app-icon-16" />
          <PickupLogo className="app-browse-header__logo" />
          <Avatar className="app-browse-header__avatar" />
        </div>
      </header>

      <main className="app-wide app-pad-bottom">
        <div className="app-hscroll app-promos">
          <Promo tone="plum" title="new furniture in your area" img={assets.promoFurniture} cta="Explore" onClick={() => setCat('Furniture')} />
          <Promo tone="moss" title="popular items" img={assets.promoPopular} cta="Discover now" onClick={() => setCat('For you')} />
        </div>

        <nav aria-label="Categories" className="app-hscroll app-categories">
          {categories.map((c) => (
            <Button key={c} size="compact" variant={cat === c ? 'overlay' : 'ghost'} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </Button>
          ))}
        </nav>

        {list.length === 0 ? (
          <Empty className="app-center" title={`Nothing listed in ${cat} yet`} description="Check back soon, or browse everything near you." />
        ) : (
          <div className="app-grid">
            {list.map((p) => (
              <ItemCard
                key={p.id}
                className="app-grid__card"
                title={p.name}
                price={`$${p.price}`}
                distance={p.distance}
                metaAddon={<DeliveryAvailableIcon />}
                condition={p.condition}
                imageSrc={p.image}
                imageAlt=""
                saved={saved.has(p.id)}
                onSaveToggle={() => toggleSaved(p.id)}
                onOpen={() => onOpen(p)}
              />
            ))}
          </div>
        )}
      </main>

      <div aria-hidden="true" className="app-bottom-fade" />
      <BottomNav view="home" onHome={() => {}} onMap={onMap} />
      {toast && <Toast>{toast}</Toast>}
    </div>
  );
}

function Promo(props: { tone: 'plum' | 'moss'; title: string; img: string; cta: string; onClick: () => void }) {
  return (
    <article className={`app-promo app-promo--${props.tone}`}>
      <p className="pk-text-display-md app-promo__title">{props.title}</p>
      <img src={props.img} alt="" className="app-promo__img" />
      <Button size="compact" className="app-promo__cta" onClick={props.onClick}>
        {props.cta}
      </Button>
    </article>
  );
}
