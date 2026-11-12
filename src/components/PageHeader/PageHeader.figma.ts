// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-410
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/PageHeader/PageHeader.tsx
// component=PageHeader
import figma from 'figma'
const instance = figma.selectedInstance

const titleLayer = instance.findText('Selling')
const title = titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title'

export default {
  example: figma.code`<PageHeader title="${title}" onBack={() => router.back()} sticky />`,
  imports: ['import { PageHeader } from "@figma/pickup-design-system"'],
  id: 'page-header',
  metadata: { nestable: false },
}
