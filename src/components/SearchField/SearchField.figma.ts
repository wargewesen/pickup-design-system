// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2338-8905
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/SearchField/SearchField.tsx
// component=SearchField
import figma from 'figma'
const instance = figma.selectedInstance

const value = instance.getString('Value')
const clear = instance.getBoolean('Clear')
const variant = instance.getEnum('Variant', { Filled: 'filled', Outline: 'outline' })
const state = instance.getEnum('State', { Default: 'default', Focused: 'default', Invalid: 'invalid', Disabled: 'disabled' })

export default {
  example: figma.code`<SearchField${variant !== 'filled' ? ` variant="${variant}"` : ''} placeholder="${value}" aria-label="${value}"${state === 'invalid' ? ' invalid' : ''}${state === 'disabled' ? ' disabled' : ''}${clear ? ' onClear={() => setQuery("")}' : ''} />`,
  imports: ['import { SearchField } from "@figma/pickup-design-system"'],
  id: 'search-field',
  metadata: { nestable: true },
}
