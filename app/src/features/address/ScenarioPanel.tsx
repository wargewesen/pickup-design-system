import { useState } from 'react';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, IconButton } from '@figma/pickup-design-system';
import type { Scenario } from './types';

type Opt<K extends keyof Scenario> = { key: K; label: string; options: { value: Scenario[K]; label: string }[] };

const groups = [
  {
    key: 'network',
    label: 'Address provider',
    options: [
      { value: 'normal', label: 'Normal' },
      { value: 'slow', label: 'Slow' },
      { value: 'offline', label: 'Offline' },
      { value: 'error', label: 'Error' },
    ],
  } as Opt<'network'>,
  {
    key: 'eligibilityService',
    label: 'Eligibility check',
    options: [
      { value: 'working', label: 'Working' },
      { value: 'failing', label: 'Failing' },
    ],
  } as Opt<'eligibilityService'>,
  {
    key: 'location',
    label: 'Location permission',
    options: [
      { value: 'granted', label: 'Allow' },
      { value: 'denied', label: 'Deny' },
      { value: 'unavailable', label: 'Unavailable' },
    ],
  } as Opt<'location'>,
  {
    key: 'returningUser',
    label: 'Visitor',
    options: [
      { value: true, label: 'Returning' },
      { value: false, label: 'First time' },
    ],
  } as Opt<'returningUser'>,
];

const tips = [
  ['Ambiguous', 'Main St · Colorado Blvd · Broadway'],
  ['Typo', 'colrado blvd · katela ave'],
  ['ZIP / partial', '92501 · 600 ora'],
  ['No results', 'zzz street'],
  ['Unavailable', 'Any Riverside address'],
  ['Can’t verify', '845 Harbor Dr · 950 Broadway SD'],
];

function PanelBody({ scenario, setScenario }: { scenario: Scenario; setScenario: (s: Scenario) => void }) {
  return (
    <div className="app-stack app-stack--20">
      {groups.map((g) => (
        <fieldset key={g.key} className="app-fieldset">
          <legend className="pk-text-label-sm app-muted app-caps">{g.label}</legend>
          <div className="app-row-wrap app-gap-6">
            {g.options.map((o) => {
              const on = scenario[g.key] === o.value;
              return (
                <Button
                  key={String(o.value)}
                  size="compact"
                  variant={on ? 'default' : 'secondary'}
                  aria-pressed={on}
                  onClick={() => setScenario({ ...scenario, [g.key]: o.value })}
                >
                  {o.label}
                </Button>
              );
            })}
          </div>
        </fieldset>
      ))}
      <div className="app-stack app-stack--8 app-tips">
        <p className="pk-text-label-sm app-muted app-caps">Try typing</p>
        <dl className="app-stack app-stack--6">
          {tips.map(([k, v]) => (
            <div key={k} className="app-tip">
              <dt className="pk-text-body-base app-muted">{k}</dt>
              <dd className="pk-text-label-sm app-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="pk-text-body-base app-muted">All addresses are fictional examples in six Southern California cities — not supported delivery markets.</p>
    </div>
  );
}

/** Prototype-only controls for simulating provider, eligibility and permission outcomes. */
export function ScenarioPanel({ scenario, setScenario }: { scenario: Scenario; setScenario: (s: Scenario) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Wide screens: persistent side panel */}
      <aside aria-label="Prototype scenarios" className="app-scenarios app-scenarios--side">
        <p className="pk-text-page-header app-ink app-pb-16">Prototype scenarios</p>
        <PanelBody scenario={scenario} setScenario={setScenario} />
      </aside>

      {/* Narrow screens: toggle + bottom sheet */}
      <IconButton
        variant="overlay"
        size="compact"
        className="app-scenarios__toggle"
        icon={<AdjustmentsHorizontalIcon />}
        aria-label="Open prototype scenarios"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="app-sheet-backdrop" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Prototype scenarios"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
            className="app-sheet app-enter"
          >
            <div className="app-sheet__head">
              <p className="pk-text-page-header app-ink">Prototype scenarios</p>
              <IconButton variant="ghost" size="compact" autoFocus icon={<XMarkIcon />} aria-label="Close" onClick={() => setOpen(false)} />
            </div>
            <PanelBody scenario={scenario} setScenario={setScenario} />
          </div>
        </div>
      )}
    </>
  );
}
