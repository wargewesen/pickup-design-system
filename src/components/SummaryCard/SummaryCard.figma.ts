// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-400
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/SummaryCard/SummaryCard.tsx
// component=SummaryCard
import figma from 'figma'
const instance = figma.selectedInstance

const titleLayer = instance.findText('Mustard lounge chair')
const title = titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Item title'
const metaLayer = instance.findText('$420 · Excellent')
const meta = metaLayer && metaLayer.type === 'TEXT' ? metaLayer.textContent : ''

export default {
  example: figma.code`<SummaryCard title="${title}" meta="${meta}" imageSrc={item.imageUrl} imageAlt="${title}" />`,
  imports: ['import { SummaryCard } from "@figma/pickup-design-system"'],
  id: 'summary-card',
  metadata: { nestable: false },
}
