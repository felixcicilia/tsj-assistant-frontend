import { Component, inject, type OnInit } from '@angular/core'
import { VerticalAppMenuComponent } from './vertical-app-menu/vertical-app-menu.component'
import { getMenuItems } from '@helpers/menu'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'

@Component({
  selector: 'vertical-menu-button',
  standalone: true,
  imports: [VerticalAppMenuComponent, LogoBoxComponent],
  template: `
    <ng-template #offcanvasContent let-offcanvas>
      <div class="offcanvas-header border-bottom">
        <component-logo-box />

        <button
          (click)="offcanvasService.dismiss()"
          class="btn-close"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body">
        <vertical-app-menu [menuItems]="menuItems"></vertical-app-menu>
      </div>
    </ng-template>

    <button
      class="navbar-toggler ms-sm-3"
      [attr.aria-expanded]="isOffcanvasOpen"
      (click)="offcanvasService.open(offcanvasContent)"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  `,
})
export class VerticalMenuButtonComponent implements OnInit {
  offcanvasService = inject(NgbOffcanvas)

  isOffcanvasOpen: boolean = false

  ngOnInit(): void {
    this.offcanvasService.activeInstance.subscribe((e) => {
      this.isOffcanvasOpen = Boolean(e)
    })
  }

  menuItems = getMenuItems()
}
