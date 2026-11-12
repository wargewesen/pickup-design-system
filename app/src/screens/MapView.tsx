import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Button, IconButton } from '@figma/pickup-design-system';
import { assets, mapPins } from '@app/lib/assets';
import { Avatar, BottomNav } from '@app/components/chrome';

export function MapView({ onHome, onPin }: { onHome: () => void; onPin: (price: string) => void }) {
  return (
    <div className="app-map">
      {/* Design canvas is 402×874; pins are positioned against it and the canvas scales up on wider screens. */}
      <div className="app-map__canvas">
        <img src={assets.mapBrowse} alt="Map of nearby listings" className="app-map__img" />
        {mapPins.map((pin, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onPin(pin.price)}
            aria-label={`Listing ${pin.price}`}
            className="app-map__pin"
            style={{ left: pin.left, top: pin.top, width: pin.w }}
          >
            <img src={pin.img} alt="" />
            <span className="pk-text-label-sm app-map__price">{pin.price}</span>
          </button>
        ))}
      </div>

      <div aria-hidden="true" className="app-map__fade app-map__fade--top" />
      <div aria-hidden="true" className="app-map__fade app-map__fade--bottom" />

      <div className="app-map__top">
        <IconButton variant="overlay" icon={<MagnifyingGlassIcon />} aria-label="Search" className="app-icon-16 app-float" />
        <Button variant="overlay" size="compact" trailingIcon={<ArrowRightIcon />} className="app-float app-map__for-you" onClick={onHome}>
          For you
        </Button>
        <Avatar className="app-browse-header__avatar app-float" />
      </div>

      <BottomNav view="map" onHome={onHome} onMap={() => {}} />
    </div>
  );
}
