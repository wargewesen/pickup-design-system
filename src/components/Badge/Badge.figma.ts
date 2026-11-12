// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-383
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Badge/Badge.tsx
// component=Badge
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Secondary: 'secondary',
  Outline: 'outline',
  Condition: 'condition',
})
// The Default variant's label layer is not bound to the "Label" property, so read the layer text.
const labelLayer = instance.findText('Label')
const label = labelLayer && labelLayer.type === 'TEXT' ? labelLayer.textContent : instance.getString('Label')

export default {
  example: figma.code`<Badge${variant !== 'default' ? ` variant="${variant}"` : ''}>${label}</Badge>`,
  imports: ['import { Badge } from "@figma/pickup-design-system"'],
  id: 'badge',
  metadata: { nestable: true },
}
