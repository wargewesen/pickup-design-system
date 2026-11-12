// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=2380-8883
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/Accordion/Accordion.tsx
// component=AccordionItem
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const content = instance.getString('Content')
const expanded = instance.getEnum('State', { Collapsed: false, Expanded: true })

export default {
  example: figma.code`<Accordion>
  <AccordionItem title="${title}"${expanded ? ' defaultOpen' : ''}>
    ${content}
  </AccordionItem>
</Accordion>`,
  imports: ['import { Accordion, AccordionItem } from "@figma/pickup-design-system"'],
  id: 'accordion',
  metadata: { nestable: false },
}
