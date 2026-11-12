// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2136-11274
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Card/Card.tsx
// component=Card
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', { Filled: 'filled', Outline: 'outline' })
const size = instance.getEnum('Size', { Default: 'default', Sm: 'sm' })
const titleLayer = instance.findText('Card title')
const title = titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Card title'
const descriptionLayer = instance.findText('Description uses muted foreground and inherits the base type scale.')
const description = descriptionLayer && descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : ''

export default {
  example: figma.code`<Card${variant !== 'filled' ? ` variant="${variant}"` : ''}${size !== 'default' ? ` size="${size}"` : ''}>
  <CardTitle>${title}</CardTitle>
  <CardDescription>${description}</CardDescription>
</Card>`,
  imports: ['import { Card, CardTitle, CardDescription } from "@figma/pickup-design-system"'],
  id: 'card',
  metadata: { nestable: false },
}
