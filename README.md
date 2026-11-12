# Pickup Design System

This is the React and TypeScript implementation of the **Pickup** design system. It is built from the
[Pickup Figma file](https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=51-6).
It includes design tokens, 21 components, Storybook, and Figma Code Connect for every component in the file, the 1,186 Heroicons included.

## Quick start

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build            # library build → dist/
```

Use it in an app (via a GitHub dependency until it is published to a registry):

```bash
npm install github:figma/pickup-design-system @heroicons/react
```

```tsx
import '@figma/pickup-design-system/styles.css';
import { Button, ItemCard } from '@figma/pickup-design-system';
import { HeartIcon } from '@heroicons/react/24/outline';

<Button variant="default">Buy now</Button>;
```

## Prototype app: delivery address flow

`app/` is the **Pickup delivery-address prototype**, rebuilt with this design system. It comes from the Figma Code Layer
[“Accommodate Dynamic Island”](https://www.figma.com/design/m1KyV7pHyJEMWZUYlUHUxl/Workflow-lab--from-ticket-to-production?node-id=10-1517)
in the Workflow lab file.

```bash
npm run app          # dev server with live reload of src/ components
npm run build:app    # static build → app-dist/
```

The screens are also in Storybook under **Prototype / Screens**. That section has one story per screen and state, plus a clickable **Full flow** story.

| Screen | Route | Built from |
| --- | --- | --- |
| Browse grid | `#/home` | PickupLogo, IconButton, Button, ItemCard, Empty |
| Browse map | `#/map` | IconButton, Button |
| Product detail | `#/product` | Badge, Alert, IconButton, StickyActionBar, Button |
| Checkout 1: delivery or pickup | `#/checkout1` | SummaryCard, Badge, StickyActionBar |
| Checkout 2: address search, manual entry, confirm | `#/checkout2` | SearchField, Input, Select, Checkbox, Alert, Badge, IconButton |
| Checkout 3: review | `#/checkout3` | Button (link), StickyActionBar |
| Delivery status | reached after checkout | SummaryCard, Button |

- **Tokens only:** app styles in `app/src/app.css` use the design-system tokens. Prototype-only colors (the peach product hero and the warning tone) are local variables at the top of that file.
- **Notch area:** headers clear the iPhone status bar and Dynamic Island through `--safe-top`, which is at least 62px on screens up to 767px wide.
- **Icons:** they come from `@heroicons/react`. The one custom glyph ("delivery available") is `app/src/components/DeliveryAvailableIcon.tsx`.
- **Images:** product photos, map renders and map pins live in `app/public/assets`, copied from the Code Layer.
- **Address data:** addresses, eligibility and the geocoding provider are mocked in `app/src/features/address/`. Use the **Prototype scenarios** panel on the address step to simulate a slow, offline or failing provider, denied location, and first-time visitors.

## What's inside

| Figma | React | Node |
| --- | --- | --- |
| Button | `Button` | 66:332 |
| Icon button | `IconButton` | 66:455 |
| Text field | `Input`, `Textarea` | 106:111 |
| Select | `Select` | 106:112 |
| Switch | `Switch` | 2327:8860 |
| Search field | `SearchField` | 2338:8905 |
| Checkbox | `Checkbox` | 2378:8889 |
| Badge | `Badge` | 66:383 |
| Card | `Card`, `CardTitle`, `CardDescription` | 2136:11274 |
| Accordion | `Accordion`, `AccordionItem` | 2380:8883 |
| Popover | `Popover` | 2381:8888 |
| Tooltip | `Tooltip`, `TooltipContent` | 2382:8891 |
| Alert | `Alert` | 2399:8887 |
| Item Card | `ItemCard` | 110:125 |
| Summary card | `SummaryCard` | 66:400 |
| Page header | `PageHeader` | 66:410 |
| Page menu | `PageMenu`, `PageMenuItem` | 66:415 |
| Empty | `Empty` | 66:433 |
| Skeleton stack | `Skeleton`, `SkeletonStack` | 66:437 |
| Sticky action bar | `StickyActionBar` | 66:446 |
| pickup-logo | `PickupLogo` | 252:212 |
| heroicons-{outline,solid,mini,micro}/* | `@heroicons/react/{24/outline,24/solid,20/solid,16/solid}` | 1,186 icons |

### Tokens

`src/tokens/tokens.css` defines every Figma variable as a CSS custom property with the **same name**:

- palette ramps: `--palette-plum-700`, …
- semantic roles: `--primary`, `--muted-foreground`, `--interaction-subtle`, …
- spacing: `--spacing`, `--spacing-control`
- radius: `--radius-xl`
- shadows: `--shadow-float`

Typography utility classes mirror the Figma text styles (`.pk-text-body-base`, `.pk-text-label-sm`, …).
Fonts are Special Gothic, Special Gothic Condensed One, and DM Mono, loaded from Google Fonts.

### Conventions

- Figma **State** variants (Hover / Pressed / Focus) are real CSS interaction states. **Disabled** and **Invalid** are props (`disabled`, `invalid`).
- Figma variant values become lower-case prop values: `Variant=Destructive` → `variant="destructive"`.
- CSS classes are prefixed `pk-`.

## Code Connect

Every Figma component in the file is connected, so Dev Mode shows real imports and props.

- Component templates: `src/components/**/*.figma.ts`
- Icon templates: `figma/icons/**`, generated from `figma/heroicons-manifest.json` by `npm run figma:generate-icons`

To republish after you change a template:

```bash
export FIGMA_ACCESS_TOKEN=…   # token with Code Connect write scope
npm run figma:parse           # validate
npm run figma:publish
```

## Project structure

```
src/
  tokens/tokens.css       design tokens
  components/<Name>/      Name.tsx, Name.css, Name.stories.tsx, Name.figma.ts
  assets/                 pickup-logo.svg
stories/                  Introduction, Foundations
figma/                    icon Code Connect templates + manifest
scripts/                  icon template generator
```
