import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StickyActionBar } from '@figma/pickup-design-system';
import { CheckoutHeader, Toast } from '@app/components/chrome';
import { AddressSearch } from '@app/features/address/AddressSearch';
import { AddressConfirm, type CheckState } from '@app/features/address/AddressConfirm';
import { ManualAddressForm } from '@app/features/address/ManualAddressForm';
import { ScenarioPanel } from '@app/features/address/ScenarioPanel';
import { checkEligibility } from '@app/features/address/provider';
import {
  formatFull,
  type Address,
  type AddressSource,
  type ConfirmedAddress,
  type SavedAddress,
  type Scenario,
} from '@app/features/address/types';

type Phase = { name: 'search' } | { name: 'manual'; editingSaved?: SavedAddress; prefill: Partial<Address> } | { name: 'confirm' };

export type AddressDraft = { query: string; selected: ConfirmedAddress | null };

export function CheckoutAddress({
  draft,
  setDraft,
  scenario,
  setScenario,
  saved,
  setSaved,
  onBack,
  onConfirmed,
  onPickup,
}: {
  draft: AddressDraft;
  setDraft: (d: AddressDraft) => void;
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
  saved: SavedAddress[];
  setSaved: (fn: (s: SavedAddress[]) => SavedAddress[]) => void;
  onBack: () => void;
  onConfirmed: (a: ConfirmedAddress) => void;
  onPickup: () => void;
}) {
  const [phase, setPhase] = useState<Phase>(draft.selected ? { name: 'confirm' } : { name: 'search' });
  const [check, setCheck] = useState<CheckState>({ status: 'checking' });
  const [checkNonce, setCheckNonce] = useState(0);
  const [unit, setUnit] = useState(draft.selected?.unit ?? '');
  const [saveForLater, setSaveForLater] = useState(false);
  const [comboOpen, setComboOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [undo, setUndo] = useState<{ item: SavedAddress; index: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const announce = useCallback((m: string) => {
    // Re-set so identical consecutive messages are still announced.
    setMessage('');
    requestAnimationFrame(() => setMessage(m));
  }, []);

  const visibleSaved = scenario.returningUser ? saved : [];
  const selected = draft.selected;

  // Run the eligibility check whenever we land on (or change) the confirmed address.
  useEffect(() => {
    if (phase.name !== 'confirm' || !selected) return;
    const ctrl = new AbortController();
    setCheck({ status: 'checking' });
    announce('Checking delivery for this address.');
    checkEligibility(selected, scenario, ctrl.signal)
      .then((result) => {
        setCheck({ status: 'done', result });
        announce(
          result === 'eligible'
            ? 'Delivery is available to this address. Press Review delivery to continue.'
            : result === 'unavailable'
              ? 'Delivery isn’t available at this address yet. Use another address or pick it up yourself.'
              : 'We couldn’t verify delivery to this address. Use another address or pick it up yourself.',
        );
      })
      .catch((e) => {
        if ((e as Error).name === 'AbortError') return;
        setCheck({ status: 'error' });
        announce('Couldn’t check delivery right now. Try again.');
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase.name, selected?.line1, selected?.city, selected?.zip, checkNonce, scenario.eligibilityService, scenario.network]);

  useEffect(() => {
    if (phase.name === 'confirm') headingRef.current?.focus();
    if (phase.name === 'search') inputRef.current?.focus({ preventScroll: true });
  }, [phase.name]);

  useEffect(() => {
    if (!undo) return;
    const id = setTimeout(() => setUndo(null), 6000);
    return () => clearTimeout(id);
  }, [undo]);

  const choose = (a: Address, source: AddressSource) => {
    setDraft({ ...draft, selected: { ...a, source } });
    setUnit(a.unit ?? '');
    setSaveForLater(false);
    setPhase({ name: 'confirm' });
  };

  const backToSearch = () => setPhase({ name: 'search' });

  const header =
    phase.name === 'search'
      ? { title: 'Where should we deliver it?', sub: 'Search for your address, or enter it yourself.' }
      : phase.name === 'manual'
        ? {
            title: phase.editingSaved ? `Edit ${phase.editingSaved.label}` : 'Enter your address',
            sub: 'Type the full delivery address. Suggestions aren’t required.',
          }
        : { title: 'Confirm your address', sub: 'Check the details before we look for a courier.' };

  const canContinue = phase.name === 'confirm' && check.status === 'done' && check.result === 'eligible';

  const confirm = () => {
    if (!selected || !canContinue) return;
    const final: ConfirmedAddress = { ...selected, unit: unit.trim() || undefined };
    if (saveForLater && selected.source !== 'saved') {
      setSaved((s) => [{ ...final, id: `saved-${Date.now()}`, label: final.line1, kind: 'recent' }, ...s.filter((x) => formatFull(x) !== formatFull(final))]);
    }
    setDraft({ ...draft, selected: final });
    onConfirmed(final);
  };

  return (
    <div className="app-page">
      <div className="app-narrow">
        <CheckoutHeader
          step={2}
          backLabel={phase.name === 'search' ? 'Back to delivery options' : 'Back to address search'}
          onBack={phase.name === 'search' ? onBack : backToSearch}
        />
        <div key={phase.name} className="app-enter app-stack app-stack--32 app-pad">
          <div className="app-stack app-stack--4 app-clear-toggle">
            <h2 ref={headingRef} tabIndex={-1} className="pk-text-heading-md app-ink app-no-outline">
              {header.title}
            </h2>
            <p className="pk-text-body-base app-muted">{header.sub}</p>
          </div>

          {phase.name === 'search' && (
            <AddressSearch
              query={draft.query}
              setQuery={(q) => setDraft({ ...draft, query: q })}
              scenario={scenario}
              saved={visibleSaved}
              inputRef={inputRef}
              announce={announce}
              onOpenChange={setComboOpen}
              onSelect={choose}
              onManual={() => setPhase({ name: 'manual', prefill: guessFromQuery(draft.query) })}
              onEditSaved={(s) => setPhase({ name: 'manual', editingSaved: s, prefill: s })}
              onRemoveSaved={(s) => {
                const index = saved.findIndex((x) => x.id === s.id);
                setSaved((list) => list.filter((x) => x.id !== s.id));
                setUndo({ item: s, index });
                announce(`${s.label} removed from your addresses.`);
                inputRef.current?.focus();
              }}
            />
          )}

          {phase.name === 'manual' && (
            <ManualAddressForm
              initial={{ ...phase.prefill, unit: phase.prefill.unit ?? '' }}
              submitLabel={phase.editingSaved ? 'Save and use' : 'Use this address'}
              onCancel={backToSearch}
              onSubmit={(a) => {
                const editing = phase.editingSaved;
                if (editing) {
                  setSaved((list) => list.map((x) => (x.id === editing.id ? { ...x, ...a } : x)));
                  choose({ ...a, id: editing.id }, 'saved');
                } else {
                  choose({ ...a, id: `manual-${Date.now()}` }, 'manual');
                }
              }}
            />
          )}

          {phase.name === 'confirm' && selected && (
            <AddressConfirm
              address={selected}
              check={check}
              unit={unit}
              setUnit={setUnit}
              saveForLater={saveForLater}
              setSaveForLater={setSaveForLater}
              onEdit={() => setPhase({ name: 'manual', prefill: { ...selected, unit } })}
              onSearchAgain={backToSearch}
              onRetry={() => setCheckNonce((n) => n + 1)}
              onPickup={onPickup}
            />
          )}

          {phase.name === 'search' && (
            <p className="pk-text-label-sm app-muted">Example addresses for this prototype — not a list of supported delivery areas.</p>
          )}
        </div>

        {phase.name !== 'manual' && !comboOpen && (
          <StickyActionBar>
            <Button disabled={!canContinue} onClick={confirm} aria-describedby={!canContinue ? 'cta-reason' : undefined}>
              Review delivery
            </Button>
          </StickyActionBar>
        )}
        {!canContinue && (
          <p id="cta-reason" className="app-sr-only">
            {phase.name === 'search' ? 'Choose or enter an address first.' : 'Available once delivery to this address is confirmed.'}
          </p>
        )}
      </div>

      {undo && (
        <Toast
          action={
            <Button
              size="compact"
              variant="ghost"
              className="app-toast__action"
              onClick={() => {
                setSaved((list) => {
                  const next = [...list];
                  next.splice(Math.min(undo.index, next.length), 0, undo.item);
                  return next;
                });
                announce(`${undo.item.label} restored.`);
                setUndo(null);
              }}
            >
              Undo
            </Button>
          }
        >
          {undo.item.label} removed
        </Toast>
      )}

      <div role="status" aria-live="polite" aria-atomic="true" className="app-sr-only">
        {message}
      </div>

      <ScenarioPanel scenario={scenario} setScenario={setScenario} />
    </div>
  );
}

/** Carry typed text into manual entry so nothing is lost when switching paths. */
function guessFromQuery(q: string): Partial<Address> {
  const trimmed = q.trim();
  if (!trimmed) return {};
  const zip = trimmed.match(/\b\d{5}\b/)?.[0];
  const rest = trimmed.replace(/\b\d{5}\b/, '').replace(/,\s*$/, '').trim();
  const [line1, city] = rest.split(',').map((s) => s.trim());
  return { line1: line1 ?? '', city: city ?? '', zip: zip ?? '' };
}
