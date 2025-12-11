import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import type { MenuItemType } from 'src/app/common/menu-items'
import { VerticalMenuItemComponent } from './vertical-menu-item.component'

@Component({
  selector: 'vertical-menu-item-with-children',
  standalone: true,
  imports: [CommonModule, VerticalMenuItemComponent, NgbCollapseModule],
  styles: `
    :host(vertical-menu-item-with-children) {
      display: contents;
    }
  `,
  template: `
    <li [class]="itemClassName">
      <a
        [class]="linkClassName + ' collapse-item'"
        data-bs-toggle="collapse"
        role="button"
        href="javascript:void(0)"
        [id]="item.key + '-menu-link'"
        aria-haspopup="true"
        [attr.aria-expanded]="!isCollapsed"
        (click)="isCollapsed = !isCollapsed"
      >
        {{ item.label }}
        <i class="dropdown-toggle ms-auto"></i>
      </a>

      <div
        [(ngbCollapse)]="isCollapsed"
        #collapse="ngbCollapse"
        class="border-start"
      >
        <ul class="nav d-flex flex-column">
          @for (child of item.children; track $index) {
            @if (child.children) {
              <vertical-menu-item-with-children
                [item]="child"
                [activeMenuItems]="activeMenuItems"
                [itemClassName]="'nav-item pe-0 ps-3'"
                [linkClassName]="'nav-link px-0 pt-1' + getActiveClass(child)"
              />
            } @else {
              <vertical-menu-item
                [item]="child"
                [itemClassName]="'nav-item px-3 pt-1'"
                [linkClassName]="'nav-link px-0 pt-1' + getActiveClass(child)"
              />
            }
          }
        </ul>
      </div>
    </li>
  `,
})
export class VerticalMenuItemWithChildrenComponent {
  @Input() item!: MenuItemType
  @Input() activeMenuItems?: string[]
  @Input() itemClassName?: string
  @Input() linkClassName?: string

  isCollapsed = true

  ngOnInit() {}

  getActiveClass(item: MenuItemType) {
    return this.activeMenuItems?.includes(item.key) ? ' show' : ''
  }
}
