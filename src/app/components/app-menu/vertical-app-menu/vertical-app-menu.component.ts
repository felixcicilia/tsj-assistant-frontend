import { Component, Input } from '@angular/core'
import { findAllParent, findMenuItem, getMenuItemFromURL } from '@helpers/menu'
import type { MenuItemType } from 'src/app/common/menu-items'
import { VerticalMenuItemWithChildrenComponent } from './components/vertical-menu-item-with-children.component'
import { VerticalMenuItemComponent } from './components/vertical-menu-item.component'

@Component({
  selector: 'vertical-app-menu',
  standalone: true,
  imports: [VerticalMenuItemWithChildrenComponent, VerticalMenuItemComponent],
  templateUrl: './vertical-app-menu.component.html',
})
export class VerticalAppMenuComponent {
  @Input() menuItems!: MenuItemType[]

  activeMenuItems?: string[]
  matchingMenuItem: MenuItemType | undefined

  ngOnInit(): void {
    if (this.menuItems)
    if (this.matchingMenuItem) {
      const activeMt = findMenuItem(this.menuItems, this.matchingMenuItem.key)
      if (activeMt) {
        this.activeMenuItems = [
          activeMt.key,
          ...findAllParent(this.menuItems, activeMt),
        ]
      }
    }
  }

  getActiveClass(item: MenuItemType) {
    return this.activeMenuItems?.includes(item.key) ? ' show' : ''
  }
}
