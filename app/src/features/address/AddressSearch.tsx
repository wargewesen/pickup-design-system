import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import {
  BriefcaseIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  MapPinIcon,
  PencilSquareIcon,
  SignalSlashIcon,
  TrashIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowPathIcon as ArrowPathMicro } from '@heroicons/react/16/solid';
import { Alert, Badge, Button, IconButton, SearchField, cx } from '@figma/pickup-design-system';
import { Spinner } from '@app/components/Spinner';
import { fetchSuggestions, locate, ProviderError } from './provider';
import { formatContext, type Address, type SavedAddress, type Scenario } from './types';

type Status = 'idle' | 'short' | 'loading' | 'slow' | 'done' | 'error' | 'offline';

const DEBOUNCE_MS = 220;
const SLOW_AFTER_MS = 2000;

export function AddressSearch({
  query,
  setQuery,
  scenario,
  saved,
  onSelect,
  onManual,
  onEditSaved,
  onRemoveSaved,
  announce,
  onOpenChange,
  inputRef,
}: {
  query: string;
  setQuery: (q: string) => void;
  scenario: Scenario;
  saved: SavedAddress[];
  onSelect: (a: Address, source: 'suggestion' | 'saved' | 'location') => void;
  onManual: () => void;
  onEditSaved: (a: SavedAddress) => void;
  onRemoveSaved: (a: SavedAddress) => void;
  announce: (msg: string) => void;
  onOpenChange: (open: boolean) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const hintId = `${uid}-hint`;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<Address[]>([]);
  const [corrected, setCorrected] = useState(false);
  const [active, setActive] = useState(-1);
  const [retry, setRetry] = useState(0);
  const [loc, setLoc] = useState<'idle' | 'locating' | 'denied' | 'unavailable'>('idle');
  const latest = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const showPanel = open && trimmed.length > 0;

  useEffect(() => onOpenChange(showPanel), [showPanel, onOpenChange]);
  useEffect(() => () => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    setActive(-1);
    if (trimmed.length === 0) {
      setStatus('idle');
      setResults([]);
      return;
    }
    if (trimmed.length < 2) {
      setStatus('short');
      return;
    }
    // Immediate feedback on every keystroke; the request itself is debounced.
    setStatus('loading');
    const id = ++latest.current;
    const ctrl = new AbortController();
    const slow = setTimeout(() => {
      if (latest.current === id) {
        setStatus((s) => (s === 'loading' ? 'slow' : s));
        announce('Still searching. This is taking longer than usual. You can keep waiting or enter your address manually.');
      }
    }, SLOW_AFTER_MS);
    const debounce = setTimeout(async () => {
      try {
        const res = await fetchSuggestions(trimmed, scenario, ctrl.signal);
        // Ignore stale responses: only the newest request may update the list.
        if (latest.current !== id) return;
        setResults(res.results);
        setCorrected(res.usedCorrection && res.results.length > 0);
        setStatus('done');
        const n = res.results.length;
        announce(
          n === 0
            ? `No addresses match ${trimmed}. You can enter your address manually.`
            : `${n} address${n === 1 ? '' : 'es'} found${res.usedCorrection ? ', including close spelling matches' : ''}. Use up and down arrows to review, Enter to select.`,
        );
      } catch (e) {
        if ((e as Error).name === 'AbortError' || latest.current !== id) return;
        const kind = e instanceof ProviderError ? e.kind : 'error';
        setStatus(kind);
        announce(
          kind === 'offline'
            ? 'You appear to be offline. Your text is kept. Retry when connected, or enter your address manually.'
            : "Couldn't load address suggestions. Your text is kept. Retry, or enter your address manually.",
        );
      } finally {
        clearTimeout(slow);
      }
    }, DEBOUNCE_MS);
    return () => {
      ctrl.abort();
      clearTimeout(debounce);
      clearTimeout(slow);
    };
  }, [trimmed, scenario, retry, announce]);

  const listVisible = showPanel && (status === 'done' || status === 'loading' || status === 'slow') && results.length > 0;
  const options = listVisible ? results : [];

  const select = (a: Address) => {
    setOpen(false);
    onSelect(a, 'suggestion');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      if (options.length) setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (options.length) setActive((i) => (i <= 0 ? options.length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      // Never auto-commit: Enter only selects a highlighted suggestion.
      if (showPanel && active >= 0 && options[active]) {
        e.preventDefault();
        select(options[active]);
      }
    } else if (e.key === 'Escape') {
      if (showPanel) {
        e.preventDefault();
        setOpen(false);
        setActive(-1);
        announce('Suggestions closed.');
      } else if (query) {
        setQuery('');
      }
    }
  };

  const useLocation = async () => {
    setLoc('locating');
    announce('Requesting your location.');
    try {
      const a = await locate(scenario);
      setLoc('idle');
      onSelect(a, 'location');
    } catch (e) {
      const kind = (e as Error).message === 'denied' ? 'denied' : 'unavailable';
      setLoc(kind);
      announce(kind === 'denied' ? 'Location access is off. Search or enter your address instead.' : "We couldn't find your location. Search or enter your address instead.");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="app-stack app-stack--24">
      <div
        ref={wrapRef}
        className="app-stack app-stack--8 app-combobox"
        onBlur={(e) => {
          if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
        }}
      >
        <label htmlFor={`${uid}-input`} className="pk-text-body-base app-ink">
          Delivery address
        </label>
        <p id={hintId} className="pk-text-body-base app-muted app-hint">
          Street and number, then city or ZIP code
        </p>
        <SearchField
          ref={inputRef}
          id={`${uid}-input`}
          className="app-full app-maxw-none"
          role="combobox"
          aria-expanded={listVisible}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-describedby={hintId}
          aria-activedescendant={active >= 0 && options[active] ? `${uid}-opt-${active}` : undefined}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="e.g. 1420 Colorado Blvd, Pasadena"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          clearLabel="Clear address"
          onClear={
            query
              ? () => {
                  setQuery('');
                  inputRef.current?.focus();
                  announce('Address cleared.');
                }
              : undefined
          }
        />

        {showPanel && (
          <div className="app-suggest">
            {status === 'short' && <PanelNote>Keep typing — add a street number or name.</PanelNote>}
            {(status === 'loading' || status === 'slow') && (
              <PanelNote icon={<Spinner className="app-brand" />}>
                {status === 'slow' ? 'Still searching — this is taking longer than usual.' : 'Searching addresses…'}
              </PanelNote>
            )}
            {status === 'done' && corrected && (
              <PanelNote>Including close matches for “{trimmed}”. Check the street and city before choosing.</PanelNote>
            )}

            <ul id={listId} role="listbox" aria-label="Address suggestions" className={cx('app-suggest__list', status === 'loading' && 'app-dim')}>
              {options.map((a, i) => (
                <li
                  key={a.id}
                  id={`${uid}-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(a)}
                  onMouseEnter={() => setActive(i)}
                  className={cx('app-suggest__option', i === active && 'app-suggest__option--active')}
                >
                  <MapPinIcon aria-hidden="true" className="app-icon-20 app-muted" />
                  <div className="app-grow app-truncate-wrap">
                    <p className="pk-text-body-base-emphasized app-ink app-truncate">{a.line1}</p>
                    <p className="pk-text-body-base app-muted app-truncate">{formatContext(a)}</p>
                  </div>
                </li>
              ))}
            </ul>

            {status === 'done' && results.length === 0 && (
              <div className="app-suggest__block">
                <p className="pk-text-body-base-emphasized app-ink">No addresses match “{trimmed}”</p>
                <p className="pk-text-body-base app-muted">Check the spelling, or try the street number and name with a city or ZIP code.</p>
                <PanelAction onClick={onManual}>Enter address manually</PanelAction>
              </div>
            )}
            {status === 'slow' && (
              <div className="app-suggest__block app-suggest__block--row">
                <PanelAction onClick={onManual}>Enter manually instead</PanelAction>
              </div>
            )}
            {(status === 'error' || status === 'offline') && (
              <div className="app-suggest__block">
                <div className="app-inline-alert">
                  {status === 'offline' ? (
                    <SignalSlashIcon aria-hidden="true" className="app-icon app-danger" />
                  ) : (
                    <ExclamationTriangleIcon aria-hidden="true" className="app-icon app-danger" />
                  )}
                  <div className="app-stack app-stack--4">
                    <p className="pk-text-body-base-emphasized app-ink">{status === 'offline' ? "You're offline" : "Couldn't load suggestions"}</p>
                    <p className="pk-text-body-base app-muted">Your text is kept. Try again, or type the full address yourself.</p>
                  </div>
                </div>
                <div className="app-row-wrap app-indent-36">
                  <PanelAction
                    primary
                    icon={<ArrowPathMicro />}
                    onClick={() => {
                      setRetry((r) => r + 1);
                      inputRef.current?.focus();
                    }}
                  >
                    Retry
                  </PanelAction>
                  <PanelAction onClick={onManual}>Enter manually</PanelAction>
                </div>
              </div>
            )}
          </div>
        )}

        <Button variant="link" className="app-self-start" onClick={onManual}>
          Enter address manually
        </Button>
      </div>

      {!showPanel && trimmed.length === 0 && (
        <div className="app-stack app-stack--24">
          <div className="app-stack app-stack--8">
            <button type="button" onClick={useLocation} disabled={loc === 'locating'} className="app-location">
              {loc === 'locating' ? (
                <Spinner className="app-icon app-brand" />
              ) : (
                <ViewfinderCircleIcon aria-hidden="true" className="app-icon app-brand" />
              )}
              <span className="app-grow">
                <span className="pk-text-body-base-emphasized app-ink app-block">
                  {loc === 'locating' ? 'Finding your location…' : 'Use my current location'}
                </span>
                <span className="pk-text-body-base app-muted app-block">We’ll only ask when you tap this</span>
              </span>
            </button>
            {(loc === 'denied' || loc === 'unavailable') && (
              <Alert
                role="alert"
                className="app-alert--warn"
                icon={<ExclamationTriangleIcon />}
                title={loc === 'denied' ? 'Location access is off' : "Couldn't find your location"}
                description={
                  loc === 'denied'
                    ? 'You can turn it on in your browser settings, or search for your address above.'
                    : 'Try again later, or search for your address above.'
                }
              />
            )}
          </div>

          {saved.length > 0 ? (
            <section aria-labelledby={`${uid}-saved`} className="app-stack app-stack--8">
              <h3 id={`${uid}-saved`} className="pk-text-body-base app-muted app-section-label">
                Your addresses
              </h3>
              <ul className="app-saved">
                {saved.map((s) => {
                  const KindIcon = s.kind === 'recent' ? ClockIcon : /work/i.test(s.label) ? BriefcaseIcon : HomeIcon;
                  return (
                    <li key={s.id} className="app-saved__item">
                      <button type="button" onClick={() => onSelect(s, 'saved')} className="app-saved__pick">
                        <KindIcon aria-hidden="true" className="app-icon app-brand" />
                        <span className="app-grow app-truncate-wrap">
                          <span className="app-saved__label">
                            <span className="pk-text-body-base-emphasized app-ink">{s.label}</span>
                            <Badge variant="secondary">{s.kind === 'recent' ? 'Recent' : 'Saved'}</Badge>
                          </span>
                          <span className="pk-text-body-base app-muted app-block app-truncate">
                            {s.line1}
                            {s.unit ? `, ${s.unit}` : ''} · {s.city}
                          </span>
                        </span>
                      </button>
                      <IconButton variant="ghost" size="compact" icon={<PencilSquareIcon />} aria-label={`Edit ${s.label} address`} onClick={() => onEditSaved(s)} />
                      <IconButton variant="ghost" size="compact" icon={<TrashIcon />} aria-label={`Remove ${s.label} address`} onClick={() => onRemoveSaved(s)} />
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : (
            <div className="app-howto">
              <p className="pk-text-body-base-emphasized app-ink">How to search</p>
              <ul className="pk-text-body-base app-muted app-stack app-stack--4">
                <li>
                  Street and number — <span className="pk-text-label-sm app-ink">1420 Colorado Blvd</span>
                </li>
                <li>
                  Add a city to narrow it — <span className="pk-text-label-sm app-ink">Main St Anaheim</span>
                </li>
                <li>
                  Or a ZIP code — <span className="pk-text-label-sm app-ink">90803</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PanelNote({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="pk-text-body-base app-muted app-suggest__note">
      {icon}
      <span>{children}</span>
    </div>
  );
}

function PanelAction({ children, onClick, primary, icon }: { children: ReactNode; onClick: () => void; primary?: boolean; icon?: ReactNode }) {
  return (
    <Button size="compact" variant={primary ? 'default' : 'outline'} trailingIcon={icon} onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
      {children}
    </Button>
  );
}

