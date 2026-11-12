import { useId, type ReactNode } from 'react';
import { ExclamationTriangleIcon, MapPinIcon, NoSymbolIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { Alert, Button, Checkbox, Input } from '@figma/pickup-design-system';
import { Spinner } from '@app/components/Spinner';
import { formatContext, type AddressSource, type ConfirmedAddress, type Eligibility } from './types';

export type CheckState = { status: 'checking' } | { status: 'done'; result: Eligibility } | { status: 'error' };

const sourceLabel: Record<AddressSource, string> = {
  suggestion: 'Chosen from suggestions',
  manual: 'Entered manually',
  saved: 'Saved address',
  location: 'From your location · approximate',
};

export function AddressConfirm({
  address,
  check,
  unit,
  setUnit,
  saveForLater,
  setSaveForLater,
  onEdit,
  onSearchAgain,
  onRetry,
  onPickup,
}: {
  address: ConfirmedAddress;
  check: CheckState;
  unit: string;
  setUnit: (v: string) => void;
  saveForLater: boolean;
  setSaveForLater: (v: boolean) => void;
  onEdit: () => void;
  onSearchAgain: () => void;
  onRetry: () => void;
  onPickup: () => void;
}) {
  const uid = useId();
  return (
    <div className="app-stack app-stack--24">
      <div className="app-address-card">
        <div className="app-address-card__row">
          <MapPinIcon className="app-icon app-brand" aria-hidden="true" />
          <div className="app-stack app-stack--4 app-grow">
            <p className="pk-text-body-base-emphasized app-ink">{address.line1}</p>
            <p className="pk-text-body-base app-muted">{formatContext(address)}</p>
            <p className="pk-text-label-sm app-muted app-pt-4">{sourceLabel[address.source]}</p>
          </div>
        </div>
        <div className="app-row-wrap app-indent-40">
          <Button size="compact" variant="outline" onClick={onEdit}>
            Edit details
          </Button>
          <Button size="compact" variant="ghost" className="app-brand" onClick={onSearchAgain}>
            Search again
          </Button>
        </div>
      </div>

      <div className="app-stack app-stack--8">
        <label htmlFor={`${uid}-unit`} className="pk-text-body-base app-ink">
          Apartment, suite, or unit <span className="app-muted">(optional)</span>
        </label>
        <Input
          id={`${uid}-unit`}
          className="app-maxw-none"
          autoComplete="address-line2"
          placeholder="e.g. Apt 4B"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>

      <EligibilityAlert check={check} onRetry={onRetry} onSearchAgain={onSearchAgain} onPickup={onPickup} />

      {address.source !== 'saved' && (
        <label className="app-check-row">
          <Checkbox checked={saveForLater} onCheckedChange={setSaveForLater} />
          <span className="app-stack">
            <span className="pk-text-body-base app-ink">Save this address for next time</span>
            <span className="pk-text-body-base app-muted">Only on this device. Remove it any time.</span>
          </span>
        </label>
      )}
    </div>
  );
}

function EligibilityAlert({
  check,
  onRetry,
  onSearchAgain,
  onPickup,
}: {
  check: CheckState;
  onRetry: () => void;
  onSearchAgain: () => void;
  onPickup: () => void;
}) {
  if (check.status === 'checking')
    return (
      <Alert
        icon={<Spinner className="app-brand" />}
        title="Checking delivery for this address…"
        description="We recognised the address. Now confirming a courier can reach it."
      />
    );
  if (check.status === 'error')
    return (
      <Alert
        variant="destructive"
        icon={<ExclamationTriangleIcon />}
        title="Couldn’t check delivery right now"
        description={
          <WithActions
            actions={
              <Button size="compact" trailingIcon={<ArrowPathIcon />} onClick={onRetry}>
                Try again
              </Button>
            }
          >
            Your address is still here. Check your connection, then try again.
          </WithActions>
        }
      />
    );
  if (check.result === 'eligible')
    return (
      <Alert
        icon={<MapPinIcon className="app-brand" />}
        title="Deliver to this address"
        description="We’ll use it to estimate the trip and share the drop-off with your courier."
      />
    );
  const unavailable = check.result === 'unavailable';
  return (
    <Alert
      className="app-alert--warn"
      icon={unavailable ? <NoSymbolIcon /> : <QuestionMarkCircleIcon />}
      title={unavailable ? 'Delivery isn’t available here yet' : 'We couldn’t verify delivery here'}
      description={
        <WithActions
          actions={
            <>
              <Button size="compact" onClick={onSearchAgain}>
                Use another address
              </Button>
              <Button size="compact" variant="outline" onClick={onPickup}>
                Pick it up myself
              </Button>
            </>
          }
        >
          {unavailable
            ? 'The address looks right, but no couriers cover it. Try a different address or arrange pickup.'
            : 'We found the address but can’t confirm a courier can reach it, so we won’t take a delivery order for it.'}
        </WithActions>
      }
    />
  );
}

function WithActions({ children, actions }: { children: ReactNode; actions: ReactNode }) {
  return (
    <>
      <p className="app-alert-text">{children}</p>
      <div className="app-row-wrap app-pt-8">{actions}</div>
    </>
  );
}
