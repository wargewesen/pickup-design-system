// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2327-8860
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Switch/Switch.tsx
// component=Switch
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { Default: 'default', Sm: 'sm' })
const checked = instance.getEnum('Checked', { True: true, False: false })
const state = instance.getEnum('State', { Default: 'default', Focus: 'default', Invalid: 'invalid', Disabled: 'disabled' })

export default {
  example: figma.code`<Switch${size !== 'default' ? ` size="${size}"` : ''}${checked ? ' defaultChecked' : ''}${state === 'invalid' ? ' invalid' : ''}${state === 'disabled' ? ' disabled' : ''} aria-label="TODO: label" />`,
  imports: ['import { Switch } from "@figma/pickup-design-system"'],
  id: 'switch',
  metadata: { nestable: true },
}
