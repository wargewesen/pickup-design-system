export type Eligibility = 'eligible' | 'unavailable' | 'unverifiable';

export type Address = {
  id: string;
  line1: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
};

export type AddressSource = 'suggestion' | 'manual' | 'saved' | 'location';

export type SavedAddress = Address & { label: string; kind: 'saved' | 'recent' };

export type ConfirmedAddress = Address & { source: AddressSource };

export type Scenario = {
  network: 'normal' | 'slow' | 'offline' | 'error';
  location: 'granted' | 'denied' | 'unavailable';
  eligibilityService: 'working' | 'failing';
  returningUser: boolean;
};

export const defaultScenario: Scenario = {
  network: 'normal',
  location: 'granted',
  eligibilityService: 'working',
  returningUser: true,
};

export const formatContext = (a: Pick<Address, 'city' | 'state' | 'zip'>) => `${a.city}, ${a.state} ${a.zip}`;
export const formatFull = (a: Address) => `${a.line1}${a.unit ? `, ${a.unit}` : ''}, ${formatContext(a)}`;
