// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-332
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Button/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const variant = instance.getEnum('Variant', {
  Default: 'default',
  Overlay: 'overlay',
  Outline: 'outline',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Destructive: 'destructive',
  Link: 'link',
})
const size = instance.getEnum('Size', { Default: 'default', Compact: 'compact' })
// Hover / Pressed / Focus are live interaction states in code; only Disabled is a prop.
const disabled = instance.getEnum('State', { Default: false, Hover: false, Pressed: false, Focus: false, Disabled: true })
const hasTrailingIcon = instance.getBoolean('Trailing icon')
let iconCode
if (hasTrailingIcon) {
  const icon = instance.getInstanceSwap('Icon')
  if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example
  }
}

export default {
  example: figma.code`<Button${variant !== 'default' ? ` variant="${variant}"` : ''}${size !== 'default' ? ` size="${size}"` : ''}${disabled ? ' disabled' : ''}${iconCode ? figma.code` trailingIcon={${iconCode}}` : ''}>
  ${label}
</Button>`,
  imports: ['import { Button } from "@figma/pickup-design-system"'],
  id: 'button',
  metadata: { nestable: true },
}
