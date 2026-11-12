// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2399-8887
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Alert/Alert.tsx
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const variant = instance.getEnum('Variant', { Default: 'default', Destructive: 'destructive' })
// Only the Default variant exposes the Icon swap; Destructive uses a fixed exclamation-triangle (the component's default).
let iconCode
if (variant === 'default') {
  const icon = instance.getInstanceSwap('Icon')
  if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example
  }
}

export default {
  example: figma.code`<Alert${variant !== 'default' ? ` variant="${variant}"` : ''}${iconCode ? figma.code` icon={${iconCode}}` : ''} title="${title}" description="${description}" />`,
  imports: ['import { Alert } from "@figma/pickup-design-system"'],
  id: 'alert',
  metadata: { nestable: false },
}
