import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'
import { footerLinks } from './data'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'

@Component({
  selector: 'account-footer',
  standalone: true,
  imports: [RouterModule, NgbCollapseModule, CommonModule, NgbDropdownModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {

  LinkData = footerLinks

  toggleMenu(item: any) {
    this.LinkData.forEach((i: any) => {
      if (i !== item) {
        i.isCollapsed = true
      }
    })
    item.isCollapsed = !item.isCollapsed
  }
}
