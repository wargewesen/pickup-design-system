import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Alert, Button, Input, Select } from '@figma/pickup-design-system';
import type { Address } from './types';

type Fields = { line1: string; unit: string; city: string; state: string; zip: string };
type Errors = Partial<Record<keyof Fields, string>>;

const STATES = ['CA', 'AZ', 'NV', 'OR', 'WA'];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.line1.trim()) e.line1 = 'Enter a street address.';
  else if (!/\d/.test(f.line1) || !/[a-z]{2,}/i.test(f.line1)) e.line1 = 'Include the building number and street name, like 1420 Colorado Blvd.';
  if (!f.city.trim()) e.city = 'Enter a city.';
  if (!/^\d{5}$/.test(f.zip.trim())) e.zip = 'Enter a 5-digit ZIP code.';
  return e;
}

export function ManualAddressForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: Partial<Fields>;
  submitLabel: string;
  onSubmit: (a: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}) {
  const uid = useId();
  const [f, setF] = useState<Fields>({ line1: '', unit: '', city: '', state: 'CA', zip: '', ...initial });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const line1Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const refs = { line1: line1Ref, city: cityRef, zip: zipRef };

  useEffect(() => {
    line1Ref.current?.focus();
  }, []);

  const set = (k: keyof Fields, v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    if (submitted) setErrors(validate(next));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(f);
    setErrors(errs);
    const first = (['line1', 'city', 'zip'] as const).find((k) => errs[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }
    onSubmit({ line1: f.line1.trim(), unit: f.unit.trim() || undefined, city: f.city.trim(), state: f.state, zip: f.zip.trim() });
  };

  const errCount = Object.keys(errors).length;
  const errProps = (k: keyof Fields) => ({
    invalid: Boolean(errors[k]),
    'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <form noValidate onSubmit={submit} className="app-stack app-stack--20" aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`} className="app-sr-only">
        Manual address entry
      </h3>
      {submitted && errCount > 0 && (
        <Alert role="alert" variant="destructive" title={errCount === 1 ? 'Check 1 field before continuing.' : `Check ${errCount} fields before continuing.`} />
      )}
      <Field id={`${uid}-line1`} label="Street address" error={errors.line1}>
        <Input ref={line1Ref} id={`${uid}-line1`} className="app-maxw-none" autoComplete="address-line1" value={f.line1} onChange={(e) => set('line1', e.target.value)} {...errProps('line1')} />
      </Field>
      <Field id={`${uid}-unit`} label="Apartment, suite, or unit" optional>
        <Input id={`${uid}-unit`} className="app-maxw-none" autoComplete="address-line2" value={f.unit} onChange={(e) => set('unit', e.target.value)} />
      </Field>
      <Field id={`${uid}-city`} label="City" error={errors.city}>
        <Input ref={cityRef} id={`${uid}-city`} className="app-maxw-none" autoComplete="address-level2" value={f.city} onChange={(e) => set('city', e.target.value)} {...errProps('city')} />
      </Field>
      <div className="app-form-split">
        <Field id={`${uid}-state`} label="State">
          <Select id={`${uid}-state`} className="app-maxw-none" autoComplete="address-level1" value={f.state} onChange={(e) => set('state', e.target.value)}>
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </Field>
        <Field id={`${uid}-zip`} label="ZIP code" error={errors.zip}>
          <Input
            ref={zipRef}
            id={`${uid}-zip`}
            className="app-maxw-none"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={f.zip}
            onChange={(e) => set('zip', e.target.value.replace(/\D/g, ''))}
            {...errProps('zip')}
          />
        </Field>
      </div>
      <div className="app-actions app-pt-8">
        <Button variant="outline" onClick={onCancel}>
          Back to search
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className="app-stack app-stack--8">
      <label htmlFor={id} className="pk-text-body-base app-ink">
        {label}
        {optional && <span className="app-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="pk-text-body-base app-danger">
          {error}
        </p>
      )}
    </div>
  );
}
