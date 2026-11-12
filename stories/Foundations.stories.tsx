import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = { title: 'Foundations/Tokens', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ramps = {
  neutral: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  mist: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  plum: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '850', '900', '950'],
  lime: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  olive: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  danger: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
};

const roles = [
  'background', 'foreground', 'card', 'card-foreground', 'card-hover', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'primary-hover', 'primary-pressed', 'secondary', 'secondary-foreground',
  'tertiary', 'tertiary-foreground', 'muted', 'muted-foreground', 'accent', 'accent-foreground',
  'destructive', 'destructive-foreground', 'destructive-hover', 'ring', 'border', 'input',
  'interaction-subtle', 'interaction', 'interaction-strong',
];

const Swatch = ({ name }: { name: string }) => (
  <div style={{ display: 'grid', gap: 4, width: 96 }}>
    <div style={{ height: 48, borderRadius: 8, background: `var(--${name})`, border: '1px solid var(--border)' }} />
    <code className="pk-text-label-sm">--{name}</code>
  </div>
);

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {Object.entries(ramps).map(([ramp, steps]) => (
        <div key={ramp} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {steps.map((s) => <Swatch key={s} name={`palette-${ramp}-${s}`} />)}
        </div>
      ))}
    </div>
  ),
};

export const SemanticRoles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {roles.map((r) => <Swatch key={r} name={r} />)}
    </div>
  ),
};

const typeScale = [
  ['pk-text-display-md', 'Display / Medium · Special Gothic Condensed One 32/32'],
  ['pk-text-heading-md', 'Heading / Medium · 24/32 Medium'],
  ['pk-text-body-lg', 'Body / Large · 18/24 +2.5'],
  ['pk-text-body-md', 'Body / Medium · 16/24'],
  ['pk-text-body-base', 'Body / Base · 14/20'],
  ['pk-text-body-base-emphasized', 'Body / Base Emphasized · 14/20 Medium'],
  ['pk-text-page-header', 'Component / Page Header · 16/24 Medium'],
  ['pk-text-label-sm', 'Label / Small · DM Mono 12/16'],
];

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {typeScale.map(([cls, label]) => (
        <div key={cls}>
          <div className={cls}>Pick it up across town</div>
          <code className="pk-text-label-sm" style={{ color: 'var(--muted-foreground)' }}>.{cls}: {label}</code>
        </div>
      ))}
    </div>
  ),
};

export const SpacingAndRadius: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        {[0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 32].map((m) => (
          <div key={m} style={{ display: 'grid', gap: 4, justifyItems: 'center' }}>
            <div style={{ width: 16, height: `calc(var(--spacing) * ${m})`, background: 'var(--primary)' }} />
            <code className="pk-text-label-sm">{m * 4}</code>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {['radius-sm', 'radius-lg', 'radius-xl', 'radius-3xl', 'radius-full'].map((r) => (
          <div key={r} style={{ display: 'grid', gap: 4 }}>
            <div style={{ width: 80, height: 80, background: 'var(--card)', borderRadius: `var(--${r})`, border: '1px solid var(--border)' }} />
            <code className="pk-text-label-sm">--{r}</code>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {['shadow-brand', 'shadow-float'].map((s) => (
          <div key={s} style={{ width: 120, height: 80, background: 'var(--card)', borderRadius: 16, boxShadow: `var(--${s})`, display: 'grid', placeItems: 'center' }}>
            <code className="pk-text-label-sm">--{s}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
