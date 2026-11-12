// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-446
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/StickyActionBar/StickyActionBar.tsx
// component=StickyActionBar
import figma from 'figma'
const instance = figma.selectedInstance

const saveLayer = instance.findText('Save')
const save = saveLayer && saveLayer.type === 'TEXT' ? saveLayer.textContent : 'Save'
const buyLayer = instance.findText('Buy now')
const buy = buyLayer && buyLayer.type === 'TEXT' ? buyLayer.textContent : 'Buy now'

export default {
  example: figma.code`<StickyActionBar>
  <Button variant="outline">${save}</Button>
  <Button>${buy}</Button>
</StickyActionBar>`,
  imports: ['import { Button, StickyActionBar } from "@figma/pickup-design-system"'],
  id: 'sticky-action-bar',
  metadata: { nestable: false },
}
