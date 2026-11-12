// url=https://www.figma.com/design/EFyQnq9UtW4uDUlWGnsQ0K/Pickup?node-id=66-415
// source=https://github.com/figma/pickup-design-system/blob/main/src/components/PageMenu/PageMenu.tsx
// component=PageMenu
import figma from 'figma'
const instance = figma.selectedInstance

function row(iconLayer, labelLayer, href) {
  const icon = instance.findInstance(iconLayer)
  const iconCode = icon && icon.type === 'INSTANCE' ? icon.executeTemplate().example : undefined
  const text = instance.findText(labelLayer)
  const label = text && text.type === 'TEXT' ? text.textContent : labelLayer
  return figma.code`<PageMenuItem icon={${iconCode}} href="${href}">${label}</PageMenuItem>`
}

const saves = row('Icon / heart', 'Saves', '/saves')
const selling = row('Icon / shopping-bag', 'Selling', '/selling')
const purchases = row('Icon / tag', 'Purchases', '/purchases')
const account = row('Icon / user-circle', 'Account', '/account')

export default {
  example: figma.code`<PageMenu>
  ${saves}
  ${selling}
  ${purchases}
  ${account}
</PageMenu>`,
  imports: ['import { PageMenu, PageMenuItem } from "@figma/pickup-design-system"'],
  id: 'page-menu',
  metadata: { nestable: false },
}
