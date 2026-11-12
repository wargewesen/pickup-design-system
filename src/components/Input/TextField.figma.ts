// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=106-111
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Input/Input.tsx
// component=Input, Textarea
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', { Input: 'input', Textarea: 'textarea' })
const variant = instance.getEnum('Variant', { Filled: 'filled', Outline: 'outline' })
const state = instance.getEnum('State', { Default: 'default', Focused: 'default', Invalid: 'invalid', Disabled: 'disabled' })
// The "Value" text property is only bound on Filled variants, so read the text layer directly.
const placeholderLayer = instance.findText('Placeholder')
const placeholder = placeholderLayer && placeholderLayer.type === 'TEXT' ? placeholderLayer.textContent : instance.getString('Value')
const Tag = type === 'textarea' ? 'Textarea' : 'Input'

export default {
  example: figma.code`<${Tag}${variant !== 'filled' ? ` variant="${variant}"` : ''} placeholder="${placeholder}"${state === 'invalid' ? ' invalid' : ''}${state === 'disabled' ? ' disabled' : ''} />`,
  imports: [type === 'textarea' ? 'import { Textarea } from "@figma/pickup-design-system"' : 'import { Input } from "@figma/pickup-design-system"'],
  id: 'text-field',
  metadata: { nestable: true },
}
