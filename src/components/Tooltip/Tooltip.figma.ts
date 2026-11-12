// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2382-8891
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Tooltip/Tooltip.tsx
// component=Tooltip
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')
const side = instance.getEnum('Side', { Top: 'top', Right: 'right', Bottom: 'bottom', Left: 'left' })

export default {
  example: figma.code`<Tooltip content="${text}"${side !== 'top' ? ` side="${side}"` : ''}>
  {/* focusable trigger, e.g. <IconButton … /> */}
</Tooltip>`,
  imports: ['import { Tooltip } from "@figma/pickup-design-system"'],
  id: 'tooltip',
  metadata: { nestable: false },
}
