// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-455
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/IconButton/IconButton.tsx
// component=IconButton
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Overlay: 'overlay',
  Outline: 'outline',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Destructive: 'destructive',
})
const size = instance.getEnum('Size', { Default: 'default', Compact: 'compact' })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true })
const icon = instance.getInstanceSwap('Icon')
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<IconButton${variant !== 'default' ? ` variant="${variant}"` : ''}${size !== 'default' ? ` size="${size}"` : ''}${disabled ? ' disabled' : ''} icon={${iconCode}} aria-label="TODO: describe action" />`,
  imports: ['import { IconButton } from "@figma/pickup-design-system"'],
  id: 'icon-button',
  metadata: { nestable: true },
}
