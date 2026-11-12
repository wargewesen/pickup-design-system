// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=110-125
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/ItemCard/ItemCard.tsx
// component=ItemCard
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const price = instance.getString('Price')
const distance = instance.getString('Distance')
const image = instance.getSlot('Product image')
const badge = instance.findText('Label', { traverseInstances: true, path: ['Badge'] })
const condition = badge && badge.type === 'TEXT' ? badge.textContent : undefined

export default {
  example: figma.code`<ItemCard
  title="${title}"
  price="${price}"
  distance="${distance}"${condition ? `
  condition="${condition}"` : ''}
  image={${image}}
  onSaveToggle={() => toggleSave(item.id)}
/>`,
  imports: ['import { ItemCard } from "@figma/pickup-design-system"'],
  id: 'item-card',
  metadata: { nestable: false },
}
