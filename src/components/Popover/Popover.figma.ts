// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2381-8888
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Popover/Popover.tsx
// component=Popover
import figma from 'figma'
const instance = figma.selectedInstance

const trigger = instance.getString('Trigger')
const title = instance.getString('Title')
const content = instance.getString('Content')
const open = instance.getEnum('State', { Closed: false, Open: true })

export default {
  example: figma.code`<Popover trigger={<Button>${trigger}</Button>} title="${title}"${open ? ' defaultOpen' : ''}>
  ${content}
</Popover>`,
  imports: ['import { Button, Popover } from "@figma/pickup-design-system"'],
  id: 'popover',
  metadata: { nestable: false },
}
